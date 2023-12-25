<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Spinner } from 'flowbite-svelte';
	import { UserSolid, LockSolid } from 'flowbite-svelte-icons';
	import { toastError } from '$lib/utils/toast';
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
			}

			loggingIn = false;
		};
	};
</script>

<svelte:head>
	<title>로그인</title>
</svelte:head>

<div class="flex flex-col max-w-xs">
	<div class="flex items-center mb-6 mx-auto">
		<img src={logo} class="mr-3 h-7 md:h-8" alt="로고" />
		<span class="text-xl font-bold text-primary-500 md:text-2xl pr-9">SDJ-IN</span>
	</div>
	<div class="w-full space-y-4">
		<h1 class="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
			SDJ-IN 계정으로 로그인
		</h1>
		<form
			method="POST"
			spellcheck="false"
			class="space-y-4"
			autocomplete="off"
			use:enhance={submitFunction}
		>
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
					: 'cursor-pointer'} w-full text-white bg-primary-500 hover:bg-primary-600"
			>
				{#if loggingIn}
					<Spinner size="5" bg="dark:text-white" />
				{:else}
					로그인
				{/if}
			</Button>
			<div class="text-sm text-center font-light text-gray-500 dark:text-white">
				아직 계정을 등록하지 않으셨나요? <a
					href="/user-auth/register"
					class="font-medium text-primary-400 hover:underline">계정 등록</a
				>
			</div>
		</form>
	</div>
</div>
