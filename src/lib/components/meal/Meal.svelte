<!--
	@component
	홈 페이지에서 보여주는 오늘 급식 정보 컴포넌트입니다.
-->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Spinner, Button, Modal } from 'flowbite-svelte';
	import { formatDate, getRandomNumberInRange } from '$lib/utils/tools';

	let showModalLunch = false,
		showModalDinner = false;

	const getMeal = async () => {
		const params = new URLSearchParams({
			date: formatDate(new Date(), '-')
		});
		const url = `/api/info/get-meal?${params.toString()}`;
		const res = await fetch(url);

		const data = await res.json();
		const mealData = data.meal;

		const meals = [
			{ name: '중식', data: mealData.lunch },
			{ name: '석식', data: mealData.dinner }
		];

		return meals;
	};

	const keywords = ['급식 메뉴 🍔', '엄준식 🎩', '맛도리(?)', '삶의 이유'];
</script>

<div
	class="relative break-all rounded-lg border bg-white p-5 dark:border-gray-600 dark:bg-gray-700"
>
	<h1 class="mb-5 text-xl">오늘의 {keywords[getRandomNumberInRange(0, 3)]}</h1>
	<div class="h-60 overflow-y-auto">
		{#await getMeal()}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner size="8" />
			</div>
		{:then meals}
			<div class="space-y-5" transition:fade>
				{#each meals as { name, data }}
					<div>
						<div class="mb-2 text-lg">{name}🍴</div>
						{#if data.meal.length !== 0}
							<div class="mb-2">
								{#each data.meal as m}
									<div class="font-light">- {m}</div>
								{/each}
							</div>
							<div>
								<Button
									size="xs"
									color="light"
									on:click={() => {
										if (name === '중식') {
											showModalLunch = true;
										} else if (name === '석식') {
											showModalDinner = true;
										}
									}}>자세히</Button
								>

								{#if name === '중식'}
									<Modal title={`${name}🍴`} size="xs" bind:open={showModalLunch} outsideclose>
										<div>
											<div class="mb-2 text-sm font-normal">알러지 정보</div>
											{#each data.meal as m, idx}
												<div class="font-light">- {m} {data.allergy[idx]}</div>
											{/each}
										</div>
										<div>
											<div class="mb-2 text-sm font-normal">영양 정보</div>
											{#each data.ntr as n}
												<div class="font-light">- {n}</div>
											{/each}
										</div>
										<div>
											<div class="mb-2 text-sm font-normal">칼로리</div>
											{data.kcal}
										</div>
									</Modal>
								{:else if name === '석식'}
									<Modal title={`${name}🍴`} size="xs" bind:open={showModalDinner} outsideclose>
										<div>
											<div class="mb-2 text-sm font-normal">알러지 정보</div>
											{#each data.meal as m, idx}
												<div class="font-light">- {m} {data.allergy[idx]}</div>
											{/each}
										</div>
										<div>
											<div class="mb-2 text-sm font-normal">영양 정보</div>
											{#each data.ntr as n}
												<div class="font-light">- {n}</div>
											{/each}
										</div>
										<div>
											<div class="mb-2 text-sm font-normal">칼로리</div>
											{data.kcal}
										</div>
									</Modal>
								{/if}
							</div>
						{:else}
							<div class="my-7 text-center">오늘은 {name}이 없습니다.</div>
						{/if}
					</div>
				{/each}
			</div>
		{/await}
	</div>
</div>
