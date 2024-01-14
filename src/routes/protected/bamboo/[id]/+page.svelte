<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Dropdown, DropdownItem, Hr } from 'flowbite-svelte';
	import { ArrowLeftSolid, DotsHorizontalOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import { goBack } from '$lib/utils/navigation';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import { resetPostsStore } from '$lib/stores/posts';
	import type { PageData } from './$types';

	export let data: PageData;

	const postData = data.post;

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
				toastSuccess('글 삭제 성공!');
				goto('/protected/bamboo');
			} else {
				toastError('글 삭제에 실패하였습니다. 나중에 다시 시도해 주세요.');
			}
		}
	};
</script>

<svelte:head>
	<title>{postData?.title ? `${postData.title} • 대나무숲` : 'Oops! 존재하지 않는 글입니다.'}</title
	>
</svelte:head>

<Button pill={true} on:click={goBack} class="invisible mb-5 !p-2 lg:visible" color="alternative">
	<ArrowLeftSolid class="pointer-events-none h-4 w-4 text-gray-500 dark:text-gray-400" />
</Button>
{#if postData}
	<div class="h-full w-full max-w-2xl break-all">
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
			<!-- 아래 html은 글을 데이터베이스에 저장할 때 이미 sanitize 해뒀습니다. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html postData.content}
		</div>
	</div>
{:else}
	<div class="mb-4 text-xl font-bold">Oops! 존재하지 않는 글입니다.</div>
{/if}
