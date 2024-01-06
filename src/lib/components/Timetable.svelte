<!--
	@component
	시간표 페이지에서 사용되는 시간표 컴포넌트입니다.
-->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getActivePeriod } from '$lib/utils/tools';

	export let timetable: { [weekday: number]: { [period: number]: any } };
	export let role: '학생' | '선생님';
	export let periodTime: string[];
	export let updatedAt: string;

	const weekday = new Date().getDay();
	let activePeriod = getActivePeriod();

	const interval = setInterval(() => {
		activePeriod = getActivePeriod();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="space-y-3">
	<h1 class="text-xl font-bold text-primary-400">{role} 시간표</h1>
	<div class="flex h-96 w-[350px]">
		<div class="flex flex-1 flex-col">
			{#each periodTime as pt, index}
				{#if index != 7}
					<div class="m-px flex-1 border border-slate-300 py-1 dark:border-slate-600">
						<div class="flex h-full flex-col justify-center text-center text-sm">
							{pt}
						</div>
					</div>
				{/if}
			{/each}
		</div>
		{#each Object.values(timetable) as value, columnIndex}
			<div class="flex flex-1 flex-col">
				{#each Object.values(value) as { a, b, changed }, index}
					{#if index != 7}
						<div
							class="m-px flex-1 border border-slate-300 py-1 dark:border-slate-600 {changed
								? 'changed'
								: ''} {columnIndex + 1 === weekday && index + 1 === activePeriod ? 'active' : ''}"
						>
							{#if a === ''}
								<div></div>
							{:else}
								<div class="flex h-full flex-col justify-center text-center text-sm">
									<div>{a}</div>
									<div>{b}</div>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<div class="text-center text-sm">
		수정일: {updatedAt}
	</div>
</div>

<style>
	.changed {
		background: linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(96, 165, 250, 0.1));
	}

	.active {
		border-image: linear-gradient(to right, #60a5fa, #00d6ff);
		border-image-slice: 1;
	}
</style>
