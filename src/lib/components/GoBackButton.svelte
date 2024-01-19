<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { ArrowLeftSolid } from 'flowbite-svelte-icons';
	import { goBack } from '$lib/utils/navigation';
</script>

<Button pill={true} on:click={goBack} class="mb-3 block !p-2 lg:mb-5" color="alternative">
	<ArrowLeftSolid class="pointer-events-none h-4 w-4 text-gray-500 dark:text-gray-400" />
</Button>
