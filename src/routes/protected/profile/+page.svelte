<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.user.username} • 프로필</title>
</svelte:head>

<div>{data.user.username}</div>
