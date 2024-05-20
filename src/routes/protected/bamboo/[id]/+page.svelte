<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import {
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		DropdownItem,
		Hr,
		Input,
		Spinner
	} from 'flowbite-svelte';
	import { DotsVerticalOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import { toastError } from '$lib/utils/toast';
	import { resetPostsStore } from '$lib/stores/posts';
	import { GoBackButton, UserProfileAvatar } from '$lib/components';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;

	const postData = data.post;

	let comment: string = '';
	let isCommenting = false;
	let isChecked = true;

	onMount(async () => {
		if (postData) {
			const requestData = { postId: postData.id };
			const res = await fetch('/api/bamboo/increase-views', {
				method: 'POST',
				body: JSON.stringify(requestData)
			});
			const { views } = await res.json();

			postData.views = views;
		}
	});

	const onPostDeleteButtonClicked = async () => {
		if (postData) {
			const requestData = { postId: postData.id };
			const res = await fetch('/api/bamboo/delete-post', {
				method: 'POST',
				body: JSON.stringify(requestData)
			});
			const { success } = await res.json();

			if (success) {
				resetPostsStore();
				goto('/protected/bamboo');
			} else {
				toastError('글 삭제에 실패하였습니다. 나중에 다시 시도해 주세요.');
			}
		}
	};

	const onCommentDeleteButtonClicked = async (commentId: number) => {
		const requestData = { commentId };
		const res = await fetch('/api/bamboo/delete-comment', {
			method: 'POST',
			body: JSON.stringify(requestData)
		});
		const { success } = await res.json();

		if (success) {
			if (postData?.comment) {
				postData.comment = postData.comment.filter((c) => c.id !== commentId);
			}
		} else {
			toastError('댓글 삭제에 실패하였습니다. 나중에 다시 시도해 주세요.');
		}
	};

	const submitFunction: SubmitFunction = ({ formData }) => {
		isCommenting = true;

		// form 태그 밖에 checkbox가 있기 때문에
		// submit시에 checkbox 수동으로 데이터를 추가해줘야 한다.
		// checkbox를 form 태그 밖에 둔 이유는, submit시에 자동으로 checkbox가 비활성화되는 것을 피하기 위함임.
		if (isChecked) {
			formData.append('anonymous', 'on');
		}

		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'success') {
				if (result.data && postData?.comment) {
					postData.comment = [...postData.comment, result.data.createdComment];
				}
			}

			isCommenting = false;
		};
	};
</script>

<svelte:head>
	<title>{postData?.title ? `${postData.title} • 대나무숲` : 'Oops! 존재하지 않는 글입니다.'}</title
	>
</svelte:head>

<GoBackButton />
{#if postData}
	<div class="h-full w-full max-w-xl break-all">
		<!-- 제목 영역 -->
		<div class="flex justify-between">
			<div class="mb-4 text-xl font-bold">{postData.title}</div>
			{#if data.user.id === postData.authorId}
				<div>
					<Button color="none" class="!p-2">
						<DotsVerticalOutline
							size="sm"
							class="pointer-events-none h-4 w-4 text-gray-500 dark:text-gray-400"
						/>
					</Button>
					<Dropdown>
						<DropdownItem
							class="flex text-red-500 dark:text-red-400"
							on:click={onPostDeleteButtonClicked}
						>
							삭제
							<TrashBinSolid
								class="pointer-events-none ml-2 mt-[2px] h-4 w-4 text-red-500 dark:text-red-400"
							/>
						</DropdownItem>
					</Dropdown>
				</div>
			{/if}
		</div>
		<!-- 내용 영역 -->
		<div class="flex justify-between whitespace-nowrap">
			<div class="flex overflow-hidden">
				<div>{postData.category}</div>
				<div
					class="ml-2 before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
				>
					{calculateElapsedTime(postData.createdAt)}
				</div>
				{#if postData.anonymous || !postData.author?.username}
					<div
						class="ml-2 overflow-hidden overflow-ellipsis before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
					>
						{postData.author?.username ?? '(알 수 없음)'}
					</div>
				{:else}
					<a
						href="/protected/profile/{postData.author.username}"
						class="ml-2 overflow-hidden overflow-ellipsis text-primary-500 underline before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:text-primary-300 dark:before:border-slate-500"
					>
						{postData.author.username}
					</a>
				{/if}
			</div>
			<div>
				조회수 {postData.views}
			</div>
		</div>
		<Hr hrClass="h-px my-6 bg-gray-300 border-0 dark:bg-gray-500" />
		<div class="w-full rounded-lg border bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html postData.content}
		</div>
		<!-- 댓글 영역 -->
		<div class="mt-10">
			<h1 class="mb-6 text-lg font-bold">댓글 {postData.comment.length}개</h1>
			<!-- 댓글 입력칸 -->
			<div class="mb-8 flex">
				<UserProfileAvatar size="sm" dotSize="md" class="mr-3" />
				<div class="w-full">
					<form
						method="POST"
						action="?/upload-comment"
						spellcheck="false"
						autocomplete="off"
						use:enhance={submitFunction}
					>
						<ButtonGroup class="mb-3 w-full">
							<Input name="comment" placeholder="댓글 추가..." bind:value={comment} class="py-1" />
							<Button
								type="submit"
								color="primary"
								disabled={isCommenting}
								class="{isCommenting
									? 'cursor-default'
									: 'cursor-pointer'} whitespace-nowrap bg-primary-400 text-white hover:bg-primary-500 hover:text-white dark:bg-primary-400 dark:hover:bg-primary-500"
							>
								{#if isCommenting}
									<Spinner size="5" bg="dark:text-white" />
								{:else}
									댓글
								{/if}
							</Button>
						</ButtonGroup>
					</form>
					<Checkbox class="whitespace-nowrap" bind:checked={isChecked}>익명 댓글</Checkbox>
				</div>
			</div>
			<!-- 댓글들 -->
			<div class="space-y-7">
				{#each postData.comment as commentData}
					<div class="flex justify-between">
						<div class="flex">
							{#if !commentData.anonymous && commentData.author?.id}
								<UserProfileAvatar class="mr-3" username={commentData.author.username} />
							{:else}
								<UserProfileAvatar
									imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
									class="mr-3"
								/>
							{/if}
							<div>
								<div class="flex text-sm">
									{#if commentData.anonymous || !commentData.author?.username}
										<div class="mr-2">{commentData.author?.username ?? '(알 수 없음)'}</div>
									{:else}
										<div class="mr-2">{commentData.author.username}</div>
									{/if}

									<div class="text-gray-500 dark:text-gray-400">
										{calculateElapsedTime(commentData.createdAt)}
									</div>
								</div>
								<div>{commentData.content}</div>
							</div>
						</div>
						<div>
							{#if commentData.author?.id === data.user.id}
								<div>
									<Button color="none" class="!p-2">
										<DotsVerticalOutline
											size="sm"
											class="pointer-events-none h-4 w-4 text-gray-500 dark:text-gray-400"
										/>
									</Button>
									<Dropdown>
										<DropdownItem
											class="flex text-red-500 dark:text-red-400"
											on:click={() => onCommentDeleteButtonClicked(commentData.id)}
										>
											삭제
											<TrashBinSolid
												class="pointer-events-none ml-2 mt-[2px] h-4 w-4 text-red-500 dark:text-red-400"
											/>
										</DropdownItem>
									</Dropdown>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="mb-4 text-xl font-bold">Oops! 존재하지 않는 글입니다.</div>
{/if}
