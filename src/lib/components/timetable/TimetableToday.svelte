<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getActivePeriod } from './get-active-period';

	export let timetable;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let timetableData: any[] = Object.values(timetable[new Date().getDay()] ?? {});
	let activePeriod = getActivePeriod();

	const interval = setInterval(() => {
		activePeriod = getActivePeriod();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="w-56 break-all">
	<div class="text-xl font-bold text-primary-400 mb-3">오늘의 시간표</div>
	<div class="h-60 flex flex-col justify-between">
		<div>
			{#each timetableData as { a, b }, index}
				{#if index != 7}
					<div class="timetable-today-item {index + 1 === activePeriod ? 'active' : ''}">
						{index + 1}교시 - {a == '' ? '없음' : `${a} ${b}`}
					</div>
				{/if}
			{:else}
				<div class="text-center font-bold mt-20">오늘은 시간표가 없습니다.</div>
			{/each}
		</div>
		<div>
			<a href="/protected/timetable" class="font-medium text-primary-400 underline"
				>전체 시간표 보기</a
			>
		</div>
	</div>
</div>

<style>
	.timetable-today-item.active::after {
		content: '👈';
	}
</style>
