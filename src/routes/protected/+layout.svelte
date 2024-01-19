<script lang="ts">
	import { Sidebar } from '$lib/components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	// 스크린 크기 설정
	let innerWidth = 0;
	let fullScreen: boolean;

	$: if (innerWidth >= 1024) {
		fullScreen = true;
	} else {
		fullScreen = false;
	}
</script>

<svelte:window bind:innerWidth />

<div class="p-5 lg:ml-64">
	<Sidebar {fullScreen} user={data.user} />
	<slot />
</div>
