<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { BambooListItem } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;

	let posts = data.posts;
	let isFullLoaded = data.isFullLoaded;

	/**
	 * 글 목록에서 스크롤이 끝에 도달했을 때 추가로 글을 받아옵니다.
	 */
	const loadPosts = async (pageNumber: number) => {
		const requestData = { pageNumber };
		const res = await fetch('/api/get-posts', {
			method: 'POST',
			body: JSON.stringify(requestData)
		});
		const data = await res.json();

		const newPosts = data.posts.map((i: any) => ({ ...i, createdAt: new Date(i.createdAt) }));
		posts = [...posts, ...newPosts];

		isFullLoaded = data.isFullLoaded;
	};

	// IntersectionObserver로 무한스크롤 기능을 구현합니다.
	let loadingElement: HTMLDivElement | undefined;
	let pageNumber = 0;

	onMount(() => {
		if (!loadingElement) {
			return;
		}

		const loadingObserver = new IntersectionObserver((entries) => {
			const element = entries[0];

			if (element.isIntersecting) {
				pageNumber += 1;
				loadPosts(pageNumber);
			}
		});

		loadingObserver.observe(loadingElement);
	});
</script>

<svelte:head>
	<title>대나무숲</title>
</svelte:head>

<div class="h-full w-full max-w-2xl">
	<Button size="sm" href="/protected/bamboo/write" color="light" class="mb-4">글쓰기</Button>
	<div class="mb-6 space-y-2">
		{#each posts as postData}
			<BambooListItem {postData} />
		{/each}
	</div>
	{#if !isFullLoaded}
		<div class="flex justify-center" bind:this={loadingElement}>
			<Spinner />
		</div>
	{/if}
</div>
