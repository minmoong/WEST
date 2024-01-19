<!--
  @component
  대나무숲 글 보기 페이지의 댓글 컴포넌트입니다.
-->
<script lang="ts">
	import { Avatar } from 'flowbite-svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import type { PostComment } from '$lib/types/bamboo/post';

	export let commentData: PostComment;
</script>

<div class="flex">
	<Avatar
		src="https://github.com/minmoong/sdj-in/assets/62737839/4043a067-1901-4151-91b5-73289c787fd0"
		class="mr-3"
	/>
	<div>
		<div class="flex text-sm">
			<div class="mr-2">{commentData.author.username}</div>
			<div class="text-gray-500 dark:text-gray-400">
				{calculateElapsedTime(commentData.createdAt)}
			</div>
		</div>
		<div>{commentData.content}</div>
	</div>
</div>
