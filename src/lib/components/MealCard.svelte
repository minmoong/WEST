<!--
	@component
	홈 페이지에서 보여주는 오늘 급식 정보 컴포넌트입니다.
-->
<script lang="ts">
	import { getRandomNumberInRange } from '$lib/utils/tools';

	export let data;

	const lunch = data.lunch;
	const dinner = data.dinner;
	const mealData = [
		{ name: '중식', data: lunch },
		{ name: '석식', data: dinner }
	];

	const keywords = ['급식', '엄준식', '영양 보충'];
	const emojis = ['🍴', '🍔', '🍗'];
	const keywordIndex = getRandomNumberInRange(0, keywords.length - 1);
	const emojiIndex = getRandomNumberInRange(0, emojis.length - 1);
</script>

<div class="w-56 break-all">
	<h1 class="mb-3 text-xl font-bold text-primary-400">
		오늘의 {keywords[keywordIndex]}
		{emojis[emojiIndex]}
	</h1>
	<div class="h-60 space-y-3 overflow-y-auto">
		{#each mealData as { name, data }}
			<div>
				<div class="text-lg font-bold">{name}</div>
				<div>
					{#each data as d}
						<div>{d}</div>
					{:else}
						<div class="text-center my-7 font-bold dark:text-white">오늘은 {name}이 없습니다.</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
