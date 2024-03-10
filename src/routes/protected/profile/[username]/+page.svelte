<script lang="ts">
	import { Button, Hr } from 'flowbite-svelte';
	import { EnvelopeOutline } from 'flowbite-svelte-icons';
	import { UserProfileAvatar } from '$lib/components';
	import UserRoleBadge from '$lib/components/UserRoleBadge.svelte';
	import { calculateElapsedTime } from '$lib/utils/tools';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title
		>{data.profileUser
			? `${data.profileUser.username} • 프로필`
			: 'Oops! 존재하지 않는 프로필입니다.'}</title
	>
</svelte:head>

{#if data.profileUser}
	<div class="h-full w-full max-w-lg space-y-4">
		<UserProfileAvatar
			size="xl"
			dotSize="xl"
			active={data.isMyProfile ? true : data.profileUser.active}
			rounded
		/>
		<div>
			<div class="flex items-center">
				<div class="mr-2 text-2xl font-bold">{data.profileUser.username}</div>
				<div><UserRoleBadge userRole={data.profileUser.role} /></div>
			</div>
			<div>
				{data.profileUser.grade}학년 {data.profileUser.class}반 {data.profileUser.role === 'TEACHER'
					? '선생님'
					: ''}
			</div>
		</div>
		<div>{data.profileUser?.bio ?? ''}</div>
		{#if data.isMyProfile}
			<Button color="alternative" size="sm">프로필 수정</Button>
		{/if}
		<Hr />
		<div class="flex items-center">
			<EnvelopeOutline class="pointer-events-none mr-3 text-gray-400" />
			<a
				href="mailto:{data.profileUser.email}"
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
