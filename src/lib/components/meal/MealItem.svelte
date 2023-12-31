<script lang="ts">
	export let meal: string[];
	export let mealType: '중식' | '석식';
</script>

<div class="mb-3">
	<div class="text-lg font-bold">{mealType}</div>
	<div>
		{#each meal as m}
			<div>{m}</div>
		{:else}
			<div class="text-center my-7 font-bold">오늘은 {mealType}이 없습니다.</div>
		{/each}
	</div>
</div>
