<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { BambooListItem } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>대나무숲</title>
</svelte:head>

<div class="h-full w-full max-w-2xl space-y-4">
	<Button size="sm" href="/protected/bamboo/write" color="light">글쓰기</Button>
	<div class="space-y-2">
		{#each data.posts as postData}
			<BambooListItem {postData} />
		{/each}
	</div>
</div>
