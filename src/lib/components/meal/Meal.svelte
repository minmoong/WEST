<script lang="ts">
	import { getRandomNumber } from '$lib/utils/tools';
	import MealItem from './MealItem.svelte';

	export let meal;

	const lunch = meal.lunch;
	const dinner = meal.dinner;

	const keywords = ['급식', '엄준식', '영양 보충'];
	const emojis = ['🍴', '🍔', '🍗'];
	const keywordIndex = getRandomNumber(0, keywords.length - 1);
	const emojiIndex = getRandomNumber(0, emojis.length - 1);
</script>

<div class="w-56 break-all">
	<div class="mb-3 text-xl font-bold text-primary-400">
		오늘의 {keywords[keywordIndex]}
		{emojis[emojiIndex]}
	</div>
	<div class="h-60 overflow-y-auto">
		<MealItem mealType="중식" meal={lunch} />
		<MealItem mealType="석식" meal={dinner} />
	</div>
</div>
