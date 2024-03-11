<!--
	@component
	홈 페이지에서 보여주는 오늘 급식 정보 컴포넌트입니다.
-->
<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	import { formatDate } from '$lib/utils/tools';

	const getMeal = async () => {
		const params = new URLSearchParams({
			date: formatDate(new Date(), '-')
		});
		const url = `/api/info/get-meal?${params.toString()}`;
		const res = await fetch(url);

		const meal = (await res.json()).meal;

		return meal;
	};
</script>

<div
	class="relative break-all rounded-2xl border bg-white p-5 dark:border-gray-600 dark:bg-gray-700"
>
	<h1 class="mb-5 text-xl">오늘의 급식 메뉴 🍔</h1>
	<div class="h-60 overflow-y-auto">
		{#await getMeal()}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner size="8" />
			</div>
		{:then meal}
			<div class="space-y-5">
				<div>
					<div class="mb-2 text-lg">중식🍴</div>
					<div>
						{#each meal.lunch as data}
							<div class="font-light">- {data}</div>
						{:else}
							<div class="text-center my-7">오늘은 중식이 없습니다.</div>
						{/each}
					</div>
				</div>
				<div>
					<div class="mb-2 text-lg">석식🍴</div>
					<div>
						{#each meal.dinner as data}
							<div class="font-light">- {data}</div>
						{:else}
							<div class="text-center my-7">오늘은 석식이 없습니다.</div>
						{/each}
					</div>
				</div>
			</div>
		{/await}
	</div>
</div>
