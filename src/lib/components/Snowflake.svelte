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

<div class="snowscreen" bind:this={container}></div>

<style>
	:global(.snowflake) {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: white;
		position: absolute;
		top: -8px;
	}

	.snowscreen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 60;
		overflow: hidden;
		pointer-events: none;
	}
</style>
