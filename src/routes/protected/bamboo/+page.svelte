<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { BambooListItem } from '$lib/components';
	import { posts, loadNewPosts } from '$lib/stores/posts';

	// IntersectionObserver로 무한스크롤 기능을 구현합니다.
	let loadingElement: HTMLDivElement | undefined;

	onMount(() => {
		if (!loadingElement) {
			return;
		}

		// eslint-disable-next-line no-undef
		const observerCallback: IntersectionObserverCallback = (entries) => {
			const element = entries[0];

			if (element.isIntersecting) {
				loadNewPosts();
			}
		};
		const loadingObserver = new IntersectionObserver(observerCallback);

		loadingObserver.observe(loadingElement);
	});
</script>

<svelte:head>
	<title>대나무숲</title>
</svelte:head>

<div class="h-full w-full max-w-2xl">
	<Button size="sm" href="/protected/bamboo/write" color="light" class="mb-4">글쓰기</Button>
	<div class="mb-6 space-y-2">
		{#each $posts.data as postData}
			<BambooListItem {postData} />
		{/each}
	</div>
	{#if !$posts.isFullLoaded}
		<div class="flex justify-center" bind:this={loadingElement}>
			<Spinner />
		</div>
	{/if}
</div>
