<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, Textarea, Alert, Button, Select, Spinner } from 'flowbite-svelte';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import type { SubmitFunction } from '@sveltejs/kit';

	let isSubmitting = false;

	const submitFunction: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'redirect') {
				toastSuccess('업로드 성공!');
			}

			isSubmitting = false;
		};
	};

	let categorySelectItems = [{ value: '자유', name: '자유 글' }];

	let selectedCategory = '자유';
</script>

<svelte:head>
	<title>글쓰기 • 대나무숲</title>
</svelte:head>

<div class="h-full w-full max-w-2xl">
	<form method="POST" class="space-y-3" use:enhance={submitFunction}>
		<h1 class="text-xl font-bold">글쓰기</h1>
		<Select
			size="sm"
			items={categorySelectItems}
			name="category"
			placeholder="카테고리"
			bind:value={selectedCategory}
			class="w-fit"
		/>
		<Input type="text" name="title" placeholder="제목을 입력하세요" />
		<Textarea rows="12" name="content" placeholder="내용을 입력하세요" />
		<Alert color="yellow">
			<span class="font-bold">주의!</span>
			적절하지 않은 내용의 글은 관리자에 의해 예고 없이 삭제될 수 있습니다.
		</Alert>
		<Button
			type="submit"
			size="sm"
			disabled={isSubmitting}
			class="bg-primary-400 hover:bg-primary-500 {isSubmitting
				? 'cursor-default'
				: 'cursor-pointer'}"
		>
			{#if isSubmitting}
				<Spinner size="5" bg="dark:text-white" />
			{:else}
				게시하기
			{/if}
		</Button>
	</form>
</div>
