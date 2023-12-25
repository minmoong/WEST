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
		Avatar,
		Button
	} from 'flowbite-svelte';
	import {
		ChartBars3FromLeftSolid,
		CogOutline,
		ArrowRightToBracketOutline,
		InfoCircleOutline
	} from 'flowbite-svelte-icons';
	import defaultProfileImg from '$lib/assets/하니.png';
	import type { User } from '@prisma/client';

	export let fullScreen: boolean;
	export let user: User;

	$: activeUrl = $page.url.pathname;

	const routes = {
		// 페이지 메뉴
		pages: [
			{
				href: '/protected',
				label: '홈'
			},
			{
				href: '/protected/timetable',
				label: '시간표'
			},
			{
				href: '/protected/bamboo',
				label: '대나무숲 🎍'
			},
			{
				href: '/protected/gallery',
				label: '갤러리 📷'
			}
		],
		// 설정 컨트롤 메뉴
		settings: [
			{
				href: '/protected/profile',
				label: '프로필 설정',
				icon: CogOutline
			},
			{
				href: '/user-auth/logout',
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
				href: '/protected/site-info',
				label: '사이트 정보',
				icon: InfoCircleOutline
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

<Button on:click={() => (hidden = false)} color="alternative" class="lg:hidden p-2 mb-4" size="md">
	<ChartBars3FromLeftSolid class="text-gray-500 dark:text-gray-400 pointer-events-none" size="md" />
</Button>

<Drawer
	{transitionParams}
	{activateClickOutside}
	{backdrop}
	bind:hidden
	width="w-fit"
	class="lg:border-e border-gray-300 p-0 dark:border-gray-700"
>
	<Sidebar {activeUrl} class="p-5">
		<div class="flex lg:hidden">
			<CloseButton on:click={() => (hidden = true)} class="text-gray-500 m-0 ml-auto" />
		</div>
		<SidebarWrapper class="bg-white p-0">
			<div class="flex mb-5">
				<Avatar src={defaultProfileImg} class="mx-3" />
				<div class="self-center text-lg font-bold break-all dark:text-white">
					{user.username}
				</div>
			</div>
			<!-- 페이지 메뉴 -->
			<SidebarGroup>
				{#each routes.pages as { href, label }}
					<SidebarItem
						{href}
						{label}
						activeClass="flex items-center p-2 text-base font-normal text-white bg-primary-400 rounded-lg"
					/>
				{/each}
			</SidebarGroup>
			<!-- 설정 컨트롤 메뉴 -->
			<SidebarGroup border>
				{#each routes.settings as { href, label, icon, linkOptions }}
					<SidebarItem {href} {label} {...linkOptions}>
						<svelte:fragment slot="icon">
							<svelte:component this={icon} class="text-gray-500 dark:text-white" />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<!-- 기타 메뉴 -->
			<SidebarGroup border>
				{#each routes.others as { href, label, icon }}
					<SidebarItem {href} {label}>
						<svelte:fragment slot="icon">
							<svelte:component this={icon} class="text-gray-500 dark:text-white" />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
