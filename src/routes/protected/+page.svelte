<script lang="ts">
	import { Bamboo, Meal, Timetable, BambooRecentComments } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>홈</title>
</svelte:head>

<div class="space-y-10">
	<div class="space-y-10 sm:grid sm:grid-cols-2 sm:gap-10 sm:space-y-0">
		<Meal />
		<Timetable grade={data.user.grade} klass={data.user.class} />
	</div>
	<div>
		<Bamboo />
	</div>
	<div>
		<BambooRecentComments />
	</div>
</div>
