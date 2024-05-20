<!--
	@component
  사용자의 프로필 사진 컴포넌트입니다.
-->
<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	export let imgUrl =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
	export let size: Size = 'md';
	export let username: string | undefined = undefined;
</script>

<Avatar
	{...$$restProps}
	src={imgUrl}
	{size}
	href={username ? `/protected/profile/${username}` : ''}
	class="shrink-0 {$$props.class}"
/>
