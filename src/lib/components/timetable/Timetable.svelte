<script lang="ts">
	export let timetable: { [weekday: number]: { [period: number]: any } };
	export let role: '학생' | '선생님';
	export let periodTime: string[];
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
		{#each Object.values(timetable) as value}
			<div class="timetable-column">
				{#each Object.values(value) as { a, b, changed }, index}
					{#if index != 7}
						<div class="timetable-item {changed ? 'changed' : ''}">
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
		<a
			href="http://xn--s39aj90b0nb2xw6xh.kr/"
			target="_blank"
			class="font-medium text-primary-400 underline">컴시간 시간표</a
		>
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
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.timetable-item.changed {
		background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(96, 165, 250, 0.1));
	}

	.timetable-item.period {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
