<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Hr, Input, Label, Textarea } from 'flowbite-svelte';
	import { EnvelopeOutline } from 'flowbite-svelte-icons';
	import { GoBackButton, UserProfileAvatar } from '$lib/components';
	import UserRoleBadge from '$lib/components/UserRoleBadge.svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import { toastError } from '$lib/utils/toast';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;

	let isProfileEditMode = false;
	let isSaving = false;

	const submitFunction: SubmitFunction = () => {
		isSaving = true;

		return async ({ result, update }) => {
			await update({ reset: false });

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'success') {
				isProfileEditMode = false;
			}

			isSaving = false;
		};
	};
</script>

<svelte:head>
	<title
		>{data.profileUser
			? `${data.profileUser.username} • 프로필`
			: 'Oops! 존재하지 않는 프로필입니다.'}</title
	>
</svelte:head>

<GoBackButton />
{#if data.profileUser}
	<div class="h-full w-full max-w-lg">
		<UserProfileAvatar size="xl" class="mx-auto mb-5 md:mx-0" />

		{#if isProfileEditMode}
			<form method="POST" class="w-full lg:w-1/2" spellcheck="false" use:enhance={submitFunction}>
				<div class="mb-5 space-y-4">
					<div>
						<Label for="username" class="mb-2">아이디</Label>
						<Input
							type="text"
							id="username"
							name="username"
							class="p-2"
							maxlength="15"
							value={data.user.username}
						/>
					</div>
					<div>
						<Label for="bio" class="mb-2">소개</Label>
						<Textarea
							id="bio"
							name="bio"
							class="p-2"
							rows="3"
							maxlength="160"
							value={data.user.bio}
						/>
					</div>
				</div>
				<div>
					<Button color="alternative" size="xs" on:click={() => (isProfileEditMode = false)}
						>취소</Button
					>
					<Button
						type="submit"
						disabled={isSaving}
						class="{isSaving
							? 'cursor-default'
							: 'cursor-pointer'} bg-primary-500 text-white hover:bg-primary-600"
						size="xs">저장</Button
					>
				</div>
			</form>
		{:else}
			<div class="mx-auto mb-7">
				<div class="flex items-center justify-center md:justify-normal">
					<div class="mr-2 text-2xl font-bold">{data.profileUser.username}</div>
					<div><UserRoleBadge userRole={data.profileUser.role} /></div>
				</div>
				<div class="text-center md:text-left">
					{data.profileUser.grade}학년 {data.profileUser.class}반 {data.profileUser.role ===
					'TEACHER'
						? '선생님'
						: ''}
				</div>
			</div>
			{#if data.profileUser.bio}
				<div class="mb-7 text-center md:text-left">{data.profileUser.bio}</div>
			{/if}
			{#if data.isMyProfile}
				<div class="flex justify-center md:justify-normal">
					<Button color="alternative" size="sm" on:click={() => (isProfileEditMode = true)}
						>프로필 수정</Button
					>
				</div>
			{/if}
		{/if}

		<Hr />
		<div class="mb-2 flex items-center">
			<EnvelopeOutline class="pointer-events-none mr-3 text-gray-400" />
			<a
				href="mailto:{data.profileUser.email}"
				target="_blank"
				class="text-primary-500 hover:underline dark:text-primary-400">{data.profileUser.email}</a
			>
		</div>
		<div class="text-gray-500 dark:text-gray-400">
			{calculateElapsedTime(data.profileUser.createdAt)}에 가입
		</div>
	</div>
{:else}
	<div class="mb-4 text-xl font-bold">Oops! 존재하지 않는 프로필입니다.</div>
{/if}
