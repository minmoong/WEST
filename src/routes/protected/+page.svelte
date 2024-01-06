<script lang="ts">
	import { MealCard, CardContainer, TimetableCard } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>홈</title>
</svelte:head>

<div class="flex flex-col space-y-4">
	<CardContainer>
		<MealCard data={data.meal} />
	</CardContainer>
	<CardContainer>
		<TimetableCard data={data.timetable.stData} grd={data.user.grade} cls={data.user.class} />
	</CardContainer>
</div>
