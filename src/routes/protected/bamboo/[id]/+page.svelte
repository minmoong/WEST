<script lang="ts">
	import { Hr } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
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
			const data = await res.json();

			postData.views = data.views;
		}
	});
</script>

<svelte:head>
	<title>글 보기</title>
</svelte:head>

{#if postData}
	<div class="h-full w-full max-w-2xl break-all pt-5">
		<h1 class="mb-4 text-xl font-bold">{postData.title}</h1>
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
