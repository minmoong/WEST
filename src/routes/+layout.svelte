<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	// import { inject } from '@vercel/analytics';
	import { Cherryblossom } from '$lib/components';
	import { printLogo } from '$lib/utils/tools';

	// inject({ mode: dev ? 'development' : 'production' });

	if (browser) {
		printLogo();
	}
</script>

<SvelteToast />
<ProgressBar class="text-primary-400 dark:text-primary-500" zIndex={60} />
<Cherryblossom />

<slot />
