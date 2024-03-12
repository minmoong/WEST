<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, ButtonGroup, Tooltip, Button, Select, Spinner } from 'flowbite-svelte';
	import {
		UserSolid,
		LockSolid,
		DotsHorizontalOutline,
		EyeSlashOutline,
		EnvelopeSolid
	} from 'flowbite-svelte-icons';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import logo from '$lib/assets/favicon.png';
	import type { SubmitFunction } from '@sveltejs/kit';

	let gradeSelectItems = [
		{ value: 1, name: '1학년' },
		{ value: 2, name: '2학년' },
		{ value: 3, name: '3학년' }
	];
	let classSelectItems = [
		{ value: 1, name: '1반' },
		{ value: 2, name: '2반' },
		{ value: 3, name: '3반' },
		{ value: 4, name: '4반' },
		{ value: 5, name: '5반' },
		{ value: 6, name: '6반' },
		{ value: 7, name: '7반' },
		{ value: 8, name: '8반' },
		{ value: 9, name: '9반' },
		{ value: 10, name: '10반' }
	];

	let isSubmitting = false;
	let isSending = false;
	let isPasscodeSent = false;

	let email = '';
	let passcode = '';

	const registerSubmitFunction: SubmitFunction = ({ formData }) => {
		isSubmitting = true;

		// email과 passcode는 register form 밑의
		// verify-email form에서 관리되기 때문에
		// register form이 submit될 때 값을 추가해줘야 한다.
		formData.append('email', email);
		formData.append('passcode', passcode);

		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'redirect') {
				toastSuccess('계정 등록이 완료되었습니다.');
			}

			isSubmitting = false;
		};
	};

	const verifyEmailSubmitFunction: SubmitFunction = () => {
		isSending = true;

		return async ({ result, update }) => {
			await update({ reset: false, invalidateAll: false });

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'success') {
				toastSuccess('이메일로 인증 코드를 보냈습니다. 확인 후 입력해 주세요.');
				isPasscodeSent = true;
			}

			isSending = false;
		};
	};
</script>

<svelte:head>
	<title>계정 등록</title>
</svelte:head>

<div class="flex h-full flex-col items-center justify-center">
	<div class="mb-6 flex">
		<img src={logo} class="mr-3 h-7 md:h-8" alt="로고" />
		<div class="pr-7 text-xl font-bold text-primary-500 md:text-2xl">WEST</div>
	</div>
	<div class="w-full max-w-xs space-y-4">
		<h1 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl">
			새 WEST 계정 등록
		</h1>
		<form
			method="POST"
			action="?/register"
			spellcheck="false"
			class="space-y-4"
			autocomplete="off"
			use:enhance={registerSubmitFunction}
		>
			<Input type="text" name="username" placeholder="아이디" required>
				<UserSolid slot="left" tabindex="-1" />
			</Input>
			<div>
				<Input
					type="password"
					name="password"
					placeholder="비밀번호"
					class="rounded-b-none"
					required
				>
					<LockSolid slot="left" tabindex="-1" />
				</Input>
				<Input
					type="password"
					name="password-check"
					placeholder="비밀번호 확인"
					class="rounded-t-none"
					required
				>
					<EyeSlashOutline slot="left" tabindex="-1" />
				</Input>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<Select name="grade" items={gradeSelectItems} placeholder="학년" required />
				<Select name="class" items={classSelectItems} placeholder="반" required />
			</div>
			<div>
				<form
					method="POST"
					action="?/verify-email"
					spellcheck="false"
					autocomplete="off"
					use:enhance={verifyEmailSubmitFunction}
				>
					<ButtonGroup class="w-full">
						<Input
							type="email"
							name="email"
							placeholder="서고 이메일"
							class="!rounded-e-none rounded-tl-lg border"
							bind:value={email}
							required
						>
							<EnvelopeSolid slot="left" tabindex="-1" />
						</Input>
						<Tooltip>참고하세요: @sdjhs.djsch.kr</Tooltip>
						<Button
							type="submit"
							color="alternative"
							class="{isSending
								? 'cursor-default'
								: 'cursor-pointer'} whitespace-nowrap !rounded-br-none"
							disabled={isSending}
						>
							{#if isSending}
								<Spinner size="5" bg="dark:text-white" />
							{:else}
								인증
							{/if}
						</Button>
					</ButtonGroup>
				</form>
				<Input
					type="text"
					name="passcode"
					placeholder="인증 코드"
					class="rounded-t-none"
					bind:value={passcode}
					required
				>
					<DotsHorizontalOutline slot="left" tabindex="-1" />
				</Input>
			</div>
			<Button
				type="submit"
				disabled={isSubmitting || isPasscodeSent === false || passcode === ''}
				class="{isSubmitting
					? 'cursor-default'
					: 'cursor-pointer'} w-full bg-primary-500 text-white hover:bg-primary-600"
			>
				{#if isSubmitting}
					<Spinner size="5" bg="dark:text-white" />
				{:else}
					계정 등록
				{/if}
			</Button>
		</form>
		<div class="text-center text-sm font-light text-gray-500 dark:text-white">
			이미 계정이 등록되어 있나요? <a
				href="/auth/login"
				class="font-medium text-primary-400 hover:underline">로그인</a
			>
		</div>
	</div>
</div>
