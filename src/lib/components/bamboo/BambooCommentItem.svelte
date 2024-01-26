<!--
  @component
  대나무숲 글 보기 페이지의 댓글 컴포넌트입니다.
-->
<script lang="ts">
	import { calculateElapsedTime } from '$lib/utils/tools';
	import { UserProfileAvatar } from '$lib/components';
	import type { PostComment } from '$lib/types/bamboo/post';

	export let commentData: PostComment;
</script>

<div class="flex">
	<UserProfileAvatar class="mr-3" />
	<div>
		<div class="flex text-sm">
			<div class="mr-2">{commentData.author?.username ?? '(알 수 없음)'}</div>
			<div class="text-gray-500 dark:text-gray-400">
				{calculateElapsedTime(commentData.createdAt)}
			</div>
		</div>
		<div>{commentData.content}</div>
	</div>
</div>
