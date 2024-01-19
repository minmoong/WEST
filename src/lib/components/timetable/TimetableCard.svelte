<!--
	@component
	홈 페이지에서 보여주는 오늘 우리반 시간표 컴포넌트입니다.
-->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ComciganStudent } from '$lib/utils/comcigan';
	import { getActivePeriod } from '$lib/utils/tools';

	export let data;
	export let grd;
	export let cls;

	let timetable = ComciganStudent.parse(data, grd, cls);
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
	<h1 class="mb-3 text-xl font-bold text-primary-400">오늘의 시간표</h1>
	<div class="flex h-60 flex-col justify-between">
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
			<a href="/protected/timetable" class="font-medium text-primary-400 hover:underline"
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
