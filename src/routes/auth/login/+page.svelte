<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Spinner } from 'flowbite-svelte';
	import { UserSolid, LockSolid, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import logo from '$lib/assets/favicon.png';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loggingIn = false;

	const submitFunction: SubmitFunction = () => {
		loggingIn = true;

		// action이 끝났을 때 호출되는 콜백
		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'redirect') {
				toastSuccess('로그인에 성공했습니다.');
			}

			loggingIn = false;
		};
	};
</script>

<svelte:head>
	<title>로그인</title>
</svelte:head>

<div class="flex h-full flex-col items-center justify-center">
	<div class="mb-6 flex">
		<img src={logo} class="mr-3 h-7 md:h-8" alt="로고" />
		<div class="pr-7 text-xl font-bold text-primary-500 md:text-2xl">SDJ-IN</div>
	</div>
	<div class="w-full max-w-xs space-y-4">
		<h1 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl">
			SDJ-IN 계정으로 로그인
		</h1>
		<form method="POST" spellcheck="false" class="space-y-4" use:enhance={submitFunction}>
			<Input type="text" name="username" placeholder="아이디" required>
				<UserSolid slot="left" tabindex="-1" />
			</Input>
			<Input type="password" name="password" placeholder="비밀번호" required>
				<LockSolid slot="left" tabindex="-1" />
			</Input>
			<Button
				type="submit"
				disabled={loggingIn}
				class="{loggingIn
					? 'cursor-default'
					: 'cursor-pointer'} w-full bg-primary-500 text-white hover:bg-primary-600"
			>
				{#if loggingIn}
					<Spinner size="5" bg="dark:text-white" />
				{:else}
					로그인
				{/if}
			</Button>
		</form>
		<div class="text-center text-sm font-light text-gray-500 dark:text-white">
			아직 계정을 등록하지 않으셨나요? <a
				href="/auth/register"
				class="font-medium text-primary-400 hover:underline">계정 등록</a
			>
		</div>
		<div class="flex items-center justify-center">
			<InfoCircleSolid size="sm" class="mr-2 text-primary-400" />
			<a
				href="https://nice-octave-c60.notion.site/SDJ-IN-8a6edd5f2cc2425a95a4de318b9932c9?pvs=4"
				target="_blank"
				class="text-sm font-medium text-primary-400 hover:underline"
			>
				사이트 소개
			</a>
		</div>
	</div>
</div>
