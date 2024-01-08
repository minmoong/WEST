<script lang="ts">
	import { browser } from '$app/environment';
	import { Select } from 'flowbite-svelte';
	import { Timetable, CardContainer } from '$lib/components';
	import { ComciganStudent, ComciganTeacher } from '$lib/utils/comcigan';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedRole = '학생';
	let roleItems = [
		{ value: '학생', name: '학생 시간표' },
		{ value: '선생님', name: '선생님 시간표' }
	];
	let selectedGrdCls = '1-1';
	let selectedThIndex = 1;

	if (browser) {
		selectedRole = window.localStorage.getItem('timetable-role') ?? '학생';
		selectedGrdCls = window.localStorage.getItem('timetable-grd-cls') ?? '1-1';
		selectedThIndex = Number(window.localStorage.getItem('timetable-th-index') ?? 1);
	}

	// 학생 시간표 파트
	$: [selectedGrade, selectedClass] = selectedGrdCls.split('-');
	$: timetable = ComciganStudent.parse(
		data.timetable.stData,
		Number(selectedGrade),
		Number(selectedClass)
	);

	let grdClsItems: any[] = [];

	let stData = data.timetable.stData;
	for (let i = 1; i <= 3; i++) {
		let 학급수 = stData['학급수'][i] - stData['가상학급수'][i];
		for (let j = 1; j <= 학급수; j++) {
			grdClsItems.push({ value: `${i}-${j}`, name: `${i}-${j}` });
		}
	}

	// 선생님 시간표 파트
	$: tTimetable = ComciganTeacher.parse(data.timetable.thData, selectedThIndex);

	let thItems: any[] = [];

	let thData = data.timetable.thData;
	for (let i = 1; i <= thData['교사수']; i++) {
		thItems.push({ value: i, name: `${i} ${thData['자료446'][i]}` });
	}

	// 함수
	const storeRole = () => {
		if (browser) {
			window.localStorage.setItem('timetable-role', selectedRole);
		}
	};

	const storeGrdCls = () => {
		if (browser) {
			window.localStorage.setItem('timetable-grd-cls', selectedGrdCls);
		}
	};

	const storeThIndex = () => {
		if (browser) {
			window.localStorage.setItem('timetable-th-index', String(selectedThIndex));
		}
	};
</script>

<svelte:head>
	<title>시간표</title>
</svelte:head>

<div class="space-y-4">
	<Select
		items={roleItems}
		class="w-fit"
		size="sm"
		placeholder="역할"
		bind:value={selectedRole}
		on:change={storeRole}
	/>

	{#if selectedRole === '학생'}
		<CardContainer>
			<Timetable
				{timetable}
				role="학생"
				periodTime={data.timetable.stData['일과시간']}
				updatedAt={data.timetable.stData['자료244']}
			/>
		</CardContainer>
		<Select
			items={grdClsItems}
			class="w-fit"
			size="sm"
			placeholder="학급"
			bind:value={selectedGrdCls}
			on:change={storeGrdCls}
		/>
	{:else if selectedRole === '선생님'}
		<CardContainer>
			<Timetable
				timetable={tTimetable}
				role="선생님"
				periodTime={data.timetable.thData['일과시간']}
				updatedAt={data.timetable.thData['자료244']}
			/>
		</CardContainer>
		<Select
			items={thItems}
			class="w-fit"
			size="sm"
			placeholder="성함"
			bind:value={selectedThIndex}
			on:change={storeThIndex}
		/>
	{/if}
</div>
