<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title
		>{data.user?.username
			? `${data.user.username} • 프로필`
			: 'Oops! 존재하지 않는 프로필입니다.'}</title
	>
</svelte:head>

{#if data.user}
	<div>{data.user.username}</div>
{:else}
	<div class="mb-4 text-xl font-bold">Oops! 존재하지 않는 프로필입니다.</div>
{/if}
