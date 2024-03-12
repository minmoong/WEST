<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { PenSolid } from 'flowbite-svelte-icons';
	import { BambooListItem } from '$lib/components';
	import { posts, loadNewPosts, resetPostsStore } from '$lib/stores/posts';

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

<div class="h-full w-full">
	<div class="mb-4 flex justify-between">
		<Button href="/protected/bamboo/write" color="light" class="h-10 w-10 !p-2">
			<PenSolid size="sm" class="pointer-events-none text-gray-500 dark:text-slate-300" />
		</Button>
		<Button
			color="light"
			class="h-10 w-10 !p-2"
			on:click={() => {
				resetPostsStore();
				loadNewPosts();
			}}
		>
			<svg
				class="h-5 w-5 text-gray-500 dark:text-slate-300"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"
				/>
			</svg>
		</Button>
	</div>
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
