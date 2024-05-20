<!--
	@component
	사이드바입니다.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';
	import {
		Drawer,
		Sidebar,
		SidebarWrapper,
		SidebarItem,
		SidebarGroup,
		CloseButton,
		Button,
		DarkMode,
		Toggle
	} from 'flowbite-svelte';
	import {
		ChartBars3FromLeftSolid,
		CogOutline,
		ArrowRightToBracketOutline,
		InfoCircleOutline,
		HomeSolid,
		UserGroupSolid
	} from 'flowbite-svelte-icons';
	import { UserRoleBadge, UserProfileAvatar } from '.';
	import type { User } from '@prisma/client';

	export let fullScreen: boolean;
	export let user: User;

	$: activeUrl = $page.url.pathname;

	const routes = {
		// 페이지 메뉴
		pages: [
			{
				href: '/protected',
				label: '홈',
				icon: HomeSolid
			},
			{
				href: '/protected/bamboo',
				label: '대나무숲',
				icon: UserGroupSolid
			}
		],
		// 설정 컨트롤 메뉴
		settings: [
			{
				href: `/protected/profile/${user.username}`,
				label: '프로필 설정',
				icon: CogOutline
			},
			{
				href: '/auth/logout',
				label: '로그아웃',
				icon: ArrowRightToBracketOutline,
				linkOptions: {
					'data-sveltekit-reload': ''
				}
			}
		],
		// 기타 메뉴
		others: [
			{
				href: 'https://nice-octave-c60.notion.site/SDJ-IN-8a6edd5f2cc2425a95a4de318b9932c9?pvs=4',
				label: '사이트 소개',
				icon: InfoCircleOutline,
				linkOptions: {
					target: '_blank'
				}
			}
		]
	};

	// Drawer 컴포넌트의 옵션들
	const transitionParams = {
		x: -320,
		duration: 150,
		easing: sineIn
	};
	$: activateClickOutside = fullScreen ? false : true;
	$: hidden = fullScreen ? false : true;
	$: backdrop = fullScreen ? false : true;
</script>

<Button on:click={() => (hidden = false)} color="alternative" class="mb-4 p-2 lg:hidden" size="md">
	<ChartBars3FromLeftSolid class="pointer-events-none text-gray-500 dark:text-gray-400" size="md" />
</Button>

<Drawer
	{transitionParams}
	{activateClickOutside}
	{backdrop}
	bind:hidden
	width="w-fit"
	class="p-0 dark:border-gray-700 lg:border-e"
>
	<Sidebar {activeUrl}>
		<SidebarWrapper class="bg-white p-5">
			<div class="flex lg:hidden">
				<CloseButton on:click={() => (hidden = true)} class="m-0 ml-auto text-gray-500" />
			</div>
			<a
				href="/protected/profile/{user.username}"
				class="mb-7 flex items-center rounded-lg py-1 pl-2 hover:bg-gray-100 hover:dark:bg-gray-700"
			>
				<UserProfileAvatar class="mr-3" />
				<div>
					<div
						class="self-center {user.username.length >= 8
							? 'text-base'
							: 'text-lg'} break-all dark:text-white"
					>
						{user.username}
					</div>
					<UserRoleBadge userRole={user.role} />
				</div>
			</a>
			<!-- 페이지 메뉴 -->
			<SidebarGroup>
				{#each routes.pages as { href, label, icon }}
					<SidebarItem
						{href}
						{label}
						class="transition-colors"
						activeClass="[&>svg]:!text-primary-500 flex items-center p-2 text-base font-normal text-primary-500 bg-gray-100 dark:bg-gray-700 rounded-lg dark:text-primary-400"
					>
						<svelte:fragment slot="icon">
							<svelte:component this={icon} class="text-gray-500 dark:text-white" />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<!-- 설정 컨트롤 메뉴 -->
			<SidebarGroup border>
				{#each routes.settings as { href, label, icon, linkOptions }}
					<SidebarItem {href} {label} {...linkOptions} class="transition-colors">
						<svelte:fragment slot="icon">
							<svelte:component this={icon} class="text-gray-500 dark:text-white" />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<!-- 기타 메뉴 -->
			<SidebarGroup border>
				{#each routes.others as { href, label, icon, linkOptions }}
					<SidebarItem {href} {label} {...linkOptions} class="transition-colors">
						<svelte:fragment slot="icon">
							<svelte:component this={icon} class="text-gray-500 dark:text-white" />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<SidebarGroup border>
				<DarkMode size="md">
					<Toggle
						slot="lightIcon"
						class="pointer-events-none"
						checked={true}
						size="small"
						color="green">다크모드</Toggle
					>
					<Toggle slot="darkIcon" class="pointer-events-none" checked={false} size="small"
						>다크모드</Toggle
					>
				</DarkMode>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
