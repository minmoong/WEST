<script lang="ts">
	import '../app.pcss';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Sidebar, Snowflake /* Darkmode */ } from '$lib/components';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;

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

<SvelteToast />
<ProgressBar class="text-primary-400 dark:text-primary-500" zIndex={100} />
<!-- <Darkmode /> -->
<Snowflake />

<div class="h-full p-5 {user ? 'lg:ml-64' : ''}">
	{#if user}
		<Sidebar {fullScreen} {user} />
	{/if}
	<slot />
</div>
