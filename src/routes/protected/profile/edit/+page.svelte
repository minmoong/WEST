<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { GoBackButton, UserProfileAvatar } from '$lib/components';
	import { toastError, toastSuccess } from '$lib/utils/toast';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;

	let isSaving = false;

	const submitFunction: SubmitFunction = () => {
		isSaving = true;

		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result.data) {
				toastError(result.data.message);
			} else if (result.type === 'redirect') {
				toastSuccess('프로필 수정에 성공했습니다.');
			}

			isSaving = false;
		};
	};
</script>

<GoBackButton />
<div class="h-full w-full max-w-lg">
	<UserProfileAvatar size="xl" class="mb-5" />
	<form method="POST" class="w-1/2" spellcheck="false" use:enhance={submitFunction}>
		<div class="mb-5 space-y-4">
			<div>
				<Label for="username" class="mb-2">아이디</Label>
				<Input type="text" id="username" name="username" class="p-2" value={data.user.username} />
			</div>
			<div>
				<Label for="bio" class="mb-2">소개</Label>
				<Textarea id="bio" name="bio" class="p-2" rows="3" maxlength="160" value={data.user.bio} />
			</div>
		</div>
		<div>
			<Button
				type="submit"
				disabled={isSaving}
				class="{isSaving
					? 'cursor-default'
					: 'cursor-pointer'} bg-primary-500 text-white hover:bg-primary-600"
				size="sm">저장</Button
			>
		</div>
	</form>
</div>
