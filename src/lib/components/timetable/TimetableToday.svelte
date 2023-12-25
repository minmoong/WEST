<script lang="ts">
	export let timetable;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let timetableData: any[] = Object.values(timetable[new Date().getDay()]);
</script>

<div class="w-56 break-all">
	<div class="text-xl font-bold text-primary-400 mb-3">오늘의 시간표</div>
	<div class="h-60 flex flex-col justify-between">
		<div>
			{#each timetableData as { a, b }, index}
				{#if index != 7}
					<div>{index + 1}교시 - {a == '' ? '없음' : `${a} ${b}`}</div>
				{/if}
			{:else}
				<div class="text-center">오늘 시간표 없음</div>
			{/each}
		</div>
		<div>
			<a href="/protected/timetable" class="font-medium text-primary-400 underline"
				>전체 시간표 보기</a
			>
		</div>
	</div>
</div>
