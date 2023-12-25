<script lang="ts">
	import { Meal, GlassContainer, TimetableToday } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>홈</title>
</svelte:head>

<div class="flex flex-row flex-wrap">
	<GlassContainer>
		<Meal meal={data.meal} />
	</GlassContainer>
	<GlassContainer>
		<TimetableToday timetable={data.timetable} />
	</GlassContainer>
</div>
