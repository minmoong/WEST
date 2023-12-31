<script lang="ts">
	import '../app.pcss';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { Sidebar, Snowflake /* Darkmode */ } from '$lib/components';
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

	console.log(
		`
		%c███████╗██████╗      ██╗      ██╗███╗   ██╗
		%c██╔════╝██╔══██╗     ██║      ██║████╗  ██║
		%c███████╗██║  ██║     ██║█████╗██║██╔██╗ ██║
		%c╚════██║██║  ██║██   ██║╚════╝██║██║╚██╗██║
		%c███████║██████╔╝╚█████╔╝      ██║██║ ╚████║
		%c╚══════╝╚═════╝  ╚════╝       ╚═╝╚═╝  ╚═══╝

		%c개발자 도구 사용법을 알고있다구요?! 저랑 사이트 개발 같이 하실래요??
	`,
		'color:#ff1a43',
		'color:#ff8d26',
		'color:#fff444',
		'color:#80fc78',
		'color:#3a9af5',
		'color:#ce00f1',
		'font-size:17px;font-weight:bold'
	);
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
