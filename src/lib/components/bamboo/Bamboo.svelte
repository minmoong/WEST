<!--
	@component
	홈 페이지에서 보여주는 대나무숲 최신 글 컴포넌트입니다.
-->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button, Spinner } from 'flowbite-svelte';
	import { EyeSolid, PenSolid } from 'flowbite-svelte-icons';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import type { PostPreview } from '$lib/types/bamboo/post';

	const getRecentPosts = async () => {
		const params = new URLSearchParams({
			'page-number': '0'
		});

		const res = await fetch(`/api/bamboo/get-posts-preview?${params.toString()}`);
		const data = await res.json();

		const posts = data.posts.map((i: PostPreview) => ({ ...i, createdAt: new Date(i.createdAt) }));

		return posts.slice(0, 5);
	};
</script>

<div class="break-all rounded-lg border bg-white p-5 dark:border-gray-600 dark:bg-gray-700">
	<div class="flex justify-between">
		<a href="/protected/bamboo" class="mb-5 text-xl">대나무숲 최신 글 🎍</a>
		<Button href="/protected/bamboo/write" color="none" class="h-10 w-10 !p-2 focus-within:ring-0">
			<PenSolid size="sm" class="pointer-events-none text-gray-500 dark:text-slate-300" />
		</Button>
	</div>
	<div class="relative h-80">
		{#await getRecentPosts()}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner size="8" />
			</div>
		{:then posts}
			<div class="grid grid-rows-5 gap-5" transition:fade>
				{#each posts as { id, createdAt, category, title, views, author }}
					<a href={`/protected/bamboo/${id}`} class="flex h-full w-full overflow-hidden">
						<div class="mr-2 flex w-10 shrink-0 flex-col items-center justify-center">
							<div>
								<EyeSolid size="xs" class="text-gray-400 dark:text-slate-300" />
							</div>
							<div>{views}</div>
						</div>
						<div>
							<div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</div>
							<div class="flex overflow-hidden whitespace-nowrap">
								<div>{category}</div>
								<div
									class="ml-2 before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
								>
									{calculateElapsedTime(createdAt)}
								</div>
								<div
									class="ml-2 overflow-hidden overflow-ellipsis before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
								>
									{author?.username ?? '(알 수 없음)'}
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</div>
</div>
