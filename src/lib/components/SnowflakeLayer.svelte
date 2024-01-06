<!--
	@component
	눈 내리는 효과를 페이지에 씌워주는 레이어입니다.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let innerWidth: number;

	const makeSnowflake = () => {
		const snowflake = document.createElement('div');

		snowflake.classList.add('snowflake');

		const delay = Math.random() * 10000;
		const initialOpacity = Math.random();
		const duration = (Math.random() * 20 + 10) * 1000;
		const endXPosition = Math.random() * 40 - 20;
		const keyframes = [
			{
				opacity: initialOpacity
			},
			{
				opacity: 0,
				transform: `translate3d(${endXPosition}vw, 100vh, 0)`
			}
		];
		const options = {
			delay,
			duration,
			easing: 'linear'
		};

		snowflake.style.left = `${Math.random() * innerWidth}px`;
		snowflake.animate(keyframes, options);

		container?.appendChild(snowflake);

		setTimeout(() => {
			container?.removeChild(snowflake);
			makeSnowflake();
		}, duration + delay);
	};

	onMount(() => {
		for (let i = 0; i < 50; i++) {
			setTimeout(makeSnowflake, 100 * i);
		}
	});
</script>

<svelte:window bind:innerWidth />

<div
	class="pointer-events-none fixed left-0 top-0 z-[60] h-full w-full overflow-hidden"
	bind:this={container}
/>

<style>
	:global(.snowflake) {
		position: absolute;
		top: -8px;
		width: 8px;
		height: 8px;
		background-color: white;
		border-radius: 50%;
	}
</style>
