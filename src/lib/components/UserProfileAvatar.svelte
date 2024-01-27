<!--
	@component
  사용자의 프로필 사진 컴포넌트입니다.
-->
<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	export let imgUrl =
		'https://github.com/minmoong/sdj-in/assets/62737839/4043a067-1901-4151-91b5-73289c787fd0';
	export let size: Size = 'md';
	export let dotSize: Size = 'lg';
	export let active: boolean;
</script>

<Avatar
	{...$$restProps}
	src={imgUrl}
	{size}
	dot={{ placement: 'bottom-right', color: active ? 'green' : 'gray', size: dotSize }}
/>
