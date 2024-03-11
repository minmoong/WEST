<!--
	@component
	홈 페이지에서 보여주는 오늘 우리반 시간표 컴포넌트입니다.
-->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import { getActivePeriod } from '$lib/utils/tools';
	import type { Timetable } from '$lib/types/timetable/timetable';

	export let grade: number;
	export let klass: number;

	let activePeriod = getActivePeriod();

	const interval = setInterval(() => {
		activePeriod = getActivePeriod();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});

	const getTimetable = async (grade: number, klass: number) => {
		const params = new URLSearchParams({
			grade: grade.toString(),
			class: klass.toString()
		});
		const url = `/api/info/get-timetable?${params.toString()}`;

		const res = await fetch(url);
		const timetable: Timetable = (await res.json()).timetable;

		return Object.values(timetable[new Date().getDay()] ?? []);
	};
</script>

<div
	class="relative break-all rounded-2xl border bg-white p-5 dark:border-gray-600 dark:bg-gray-700"
>
	<h1 class="mb-5 text-xl">{grade}학년 {klass}반 시간표 📅</h1>
	<div class="h-60 overflow-y-auto">
		{#await getTimetable(grade, klass)}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner size="8" />
			</div>
		{:then timetable}
			<div class="space-y-2">
				{#each timetable as { subject, teacher }, index}
					{#if index != 7}
						<div
							class="font-light [&.active]:font-bold [&.active]:after:content-['👈'] {index + 1 ===
							activePeriod
								? 'active'
								: ''}"
						>
							{index + 1}교시 - {subject == '' ? '없음' : `${subject} ${teacher}`}
						</div>
					{/if}
				{:else}
					<div
						class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
					>
						오늘은 시간표가 없습니다.
					</div>
				{/each}
			</div>
		{/await}
	</div>
</div>
