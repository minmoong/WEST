<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import {
		Avatar,
		Button,
		ButtonGroup,
		Dropdown,
		DropdownItem,
		Hr,
		Input,
		Spinner
	} from 'flowbite-svelte';
	import { DotsHorizontalOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import { resetPostsStore } from '$lib/stores/posts';
	import BambooCommentItem from '$lib/components/bamboo/BambooCommentItem.svelte';
	import GoBackButton from '$lib/components/GoBackButton.svelte';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;

	const postData = data.post;

	let comment: string = '';
	let isCommenting = false;

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

	const onDeleteButtonClicked = async () => {
		if (postData) {
			const requestData = { postId: postData.id };
			const res = await fetch('/api/bamboo/delete-post', {
				method: 'POST',
				body: JSON.stringify(requestData)
			});
			const { success } = await res.json();

			if (success) {
				resetPostsStore();
				toastSuccess('글을 삭제하였습니다.');
				goto('/protected/bamboo');
			} else {
				toastError('글 삭제에 실패하였습니다. 나중에 다시 시도해 주세요.');
			}
		}
	};

	const submitFunction: SubmitFunction = () => {
		isCommenting = true;

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
					<Button pill={true} color="alternative" class="!p-2">
						<DotsHorizontalOutline
							size="sm"
							class="pointer-events-none h-4 w-4 text-gray-500 dark:text-gray-400"
						/>
					</Button>
					<Dropdown>
						<DropdownItem
							class="flex text-red-500 dark:text-red-400"
							on:click={onDeleteButtonClicked}
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
				<div
					class="ml-2 overflow-hidden overflow-ellipsis before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
				>
					{postData.author.username}
				</div>
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
			<div class="mb-8 flex items-center">
				<Avatar
					src="https://github.com/minmoong/sdj-in/assets/62737839/4043a067-1901-4151-91b5-73289c787fd0"
					class="mr-3"
					size="sm"
				/>
				<form
					method="POST"
					action="?/upload-comment"
					spellcheck="false"
					autocomplete="off"
					class="w-full"
					use:enhance={submitFunction}
				>
					<ButtonGroup class="w-full">
						<Input name="comment" placeholder="댓글 추가..." bind:value={comment} />
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
			</div>
			<div class="space-y-7">
				{#each postData.comment as commentData}
					<BambooCommentItem {commentData} />
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="mb-4 text-xl font-bold">Oops! 존재하지 않는 글입니다.</div>
{/if}
