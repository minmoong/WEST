<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { SnowflakeLayer } from '$lib/components';
	import { printLogo } from '$lib/utils/tools';

	if (browser) {
		printLogo();
	}
</script>

<SvelteToast />
<ProgressBar class="text-primary-400 dark:text-primary-500" zIndex={60} />
<SnowflakeLayer />

<slot />
