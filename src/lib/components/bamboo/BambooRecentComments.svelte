<!--
	@component
	홈 페이지에서 보여주는 대나무숲 최신 댓글 컴포넌트입니다.
-->
<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { calculateElapsedTime } from '$lib/utils/tools';

	const getRecentComments = async () => {
		const params = new URLSearchParams({
			take: '5'
		});

		const res = await fetch(`/api/bamboo/get-recent-comments?${params.toString()}`);
		const data = await res.json();

		const comments = data.comments.map((i: any) => ({ ...i, createdAt: new Date(i.createdAt) }));

		return comments;
	};
</script>

<div class="break-all rounded-lg border bg-white p-5 dark:border-gray-600 dark:bg-gray-700">
	<div class="flex justify-between">
		<div class="mb-5 text-lg">대나무숲 최신 댓글 💬</div>
	</div>
	<div class="relative h-36">
		{#await getRecentComments()}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner size="8" />
			</div>
		{:then comments}
			<div class="grid grid-rows-5 gap-2" transition:fade>
				{#each comments as { createdAt, content, postId }}
					<a
						href={`/protected/bamboo/${postId}`}
						class="flex h-full w-full justify-between overflow-hidden"
					>
						<div class="w-4/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
							{content}
						</div>
						<div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
							{calculateElapsedTime(createdAt)}
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</div>
</div>
