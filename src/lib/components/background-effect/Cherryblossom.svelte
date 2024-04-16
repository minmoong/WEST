<!--
	@component
	벚꽃이는 효과를 페이지에 씌워주는 레이어입니다.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Sakura } from '$lib/utils/sakura';

	let container: HTMLDivElement;

	onMount(() => {
		new (Sakura as any)(container);
	});
</script>

<div
	class="pointer-events-none fixed left-0 top-0 z-[60] h-full w-full overflow-hidden"
	bind:this={container}
/>

<style>
	@keyframes -global-fall {
		0% {
			opacity: 0.9;
			top: 0;
		}
		100% {
			opacity: 0.2;
			top: 100%;
		}
	}

	@keyframes -global-blow-soft-left {
		0% {
			margin-left: 0;
		}
		100% {
			margin-left: -50%;
		}
	}

	@keyframes -global-blow-medium-left {
		0% {
			margin-left: 0;
		}
		100% {
			margin-left: -100%;
		}
	}

	@keyframes -global-blow-soft-right {
		0% {
			margin-left: 0;
		}
		100% {
			margin-left: 50%;
		}
	}

	@keyframes -global-blow-medium-right {
		0% {
			margin-left: 0;
		}
		100% {
			margin-left: 100%;
		}
	}

	@keyframes -global-sway-0 {
		0% {
			transform: rotate(-5deg);
		}
		40% {
			transform: rotate(28deg);
		}
		100% {
			transform: rotate(3deg);
		}
	}

	@keyframes -global-sway-1 {
		0% {
			transform: rotate(10deg);
		}
		40% {
			transform: rotate(43deg);
		}
		100% {
			transform: rotate(15deg);
		}
	}

	@keyframes -global-sway-2 {
		0% {
			transform: rotate(15deg);
		}
		40% {
			transform: rotate(56deg);
		}
		100% {
			transform: rotate(22deg);
		}
	}

	@keyframes -global-sway-3 {
		0% {
			transform: rotate(25deg);
		}
		40% {
			transform: rotate(74deg);
		}
		100% {
			transform: rotate(37deg);
		}
	}

	@keyframes -global-sway-4 {
		0% {
			transform: rotate(40deg);
		}
		40% {
			transform: rotate(68deg);
		}
		100% {
			transform: rotate(25deg);
		}
	}

	@keyframes -global-sway-5 {
		0% {
			transform: rotate(50deg);
		}
		40% {
			transform: rotate(78deg);
		}
		100% {
			transform: rotate(40deg);
		}
	}

	@keyframes -global-sway-6 {
		0% {
			transform: rotate(65deg);
		}
		40% {
			transform: rotate(92deg);
		}
		100% {
			transform: rotate(58deg);
		}
	}

	@keyframes -global-sway-7 {
		0% {
			transform: rotate(72deg);
		}
		40% {
			transform: rotate(118deg);
		}
		100% {
			transform: rotate(68deg);
		}
	}

	@keyframes -global-sway-8 {
		0% {
			transform: rotate(94deg);
		}
		40% {
			transform: rotate(136deg);
		}
		100% {
			transform: rotate(82deg);
		}
	}

	:global(.sakura) {
		pointer-events: none;
		position: absolute;
	}
</style>
