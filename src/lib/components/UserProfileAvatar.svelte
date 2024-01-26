<!--
	@component
  사용자의 프로필 사진 컴포넌트입니다.
-->
<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	export let imgUrl =
		'https://github.com/minmoong/sdj-in/assets/62737839/4043a067-1901-4151-91b5-73289c787fd0';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let active = true;
</script>

<Avatar
	{...$$restProps}
	src={imgUrl}
	{size}
	border
	class="{active ? '!ring-green-400' : 'ring-gray-300 dark:ring-gray-500'} {$$props.class}"
/>
