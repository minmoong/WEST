<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getActivePeriod } from './get-active-period';

	export let timetable: { [weekday: number]: { [period: number]: any } };
	export let role: '학생' | '선생님';
	export let periodTime: string[];

	const weekday = new Date().getDay();
	let activePeriod = getActivePeriod();

	const interval = setInterval(() => {
		activePeriod = getActivePeriod();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="text-xl font-bold text-primary-400 mb-3">{role} 시간표</div>
<div class="timetable">
	<div class="timetable-table">
		<div class="timetable-column">
			{#each periodTime as pt, index}
				{#if index != 7}
					<div class="timetable-item period">{pt}</div>
				{/if}
			{/each}
		</div>
		{#each Object.values(timetable) as value, columnIndex}
			<div class="timetable-column">
				{#each Object.values(value) as { a, b, changed }, index}
					{#if index != 7}
						<div
							class="timetable-item {changed ? 'changed' : ''} {columnIndex + 1 === weekday &&
							index + 1 === activePeriod
								? 'active'
								: ''}"
						>
							{#if a === ''}
								<div></div>
							{:else}
								<div>{a}</div>
								<div>{b}</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<div>
		{#if role === '학생'}
			<a
				href="http://xn--s39aj90b0nb2xw6xh.kr/"
				target="_blank"
				class="font-medium text-primary-400 underline">컴시간학생</a
			>
		{:else if role === '선생님'}
			<a
				href="http://xn--s39aqy283b66bj2x.kr/"
				target="_blank"
				class="font-medium text-primary-400 underline">컴시간교사</a
			>
		{/if}
	</div>
</div>

<style>
	.timetable-table {
		display: flex;
		width: 370px;
		height: 400px;
		margin-bottom: 5px;
	}

	.timetable-column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.timetable-item {
		flex: 1;
		padding: 4px 0 4px 0;
		margin: 1px;
		font-size: 14px;
		text-align: center;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.timetable-item.changed {
		background: linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(96, 165, 250, 0.1));
	}

	.timetable-item.active {
		border-image: linear-gradient(to right, #60a5fa, #00d6ff);
		border-image-slice: 1;
	}

	.timetable-item.period {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
