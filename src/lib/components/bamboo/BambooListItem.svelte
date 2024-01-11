<!--
  @component
  대나무숲 페이지의 글 목록을 구성하는 리스트 컴포넌트입니다.
-->
<script lang="ts">
	import { CaretUpSolid } from 'flowbite-svelte-icons';
	import { calculateElapsedTime } from '$lib/utils/tools';

	export let postData: {
		createdAt: Date;
		category: string;
		title: string;
		views: number;
		author: {
			username: string;
		};
	};
</script>

<div
	class="flex w-full rounded-2xl border p-3 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
>
	<div class="mx-3 flex w-10 flex-col items-center justify-center">
		<div>
			<CaretUpSolid size="xs" class="text-gray-400 dark:text-slate-300" />
		</div>
		<div>{postData.views}</div>
	</div>
	<div>
		<div>{postData.title}</div>
		<div class="flex">
			<div>{postData.category}</div>
			<div
				class="ml-2 before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
			>
				{calculateElapsedTime(postData.createdAt)}
			</div>
			<div
				class="ml-2 before:mr-2 before:inline-block before:h-3 before:border before:border-slate-300 before:align-middle dark:before:border-slate-500"
			>
				{postData.author.username}
			</div>
		</div>
	</div>
</div>
