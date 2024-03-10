<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		// 현활 상태 활성화
		const params = new URLSearchParams({ active: 'true' });
		await fetch(`/api/user/set-active-state?${params}`);
	});

	beforeNavigate(async (navigation) => {
		if (navigation.type === 'leave') {
			// 현활 상태 비활성화
			const params = new URLSearchParams({ active: 'false' });
			await fetch(`/api/user/set-active-state?${params}`);
		}
	});
</script>

<svelte:window bind:innerWidth />

<div class="p-5 lg:ml-64">
	<Sidebar {fullScreen} user={data.user} />
	<slot />
</div>
