<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>프로필 - {data.user?.username}</title>
</svelte:head>

<h1>프로필 - {data.user?.username}</h1>
