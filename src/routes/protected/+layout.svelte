<script lang="ts">
	import { Sidebar } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;

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

<div class="h-full p-5 lg:ml-64">
	<Sidebar {fullScreen} user={data.user} />
	<slot />
</div>
