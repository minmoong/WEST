<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	// import { inject } from '@vercel/analytics';
	import { AutumnLeaves } from '$lib/components';
	import { printLogo } from '$lib/utils/tools';

	// inject({ mode: dev ? 'development' : 'production' });

	if (browser) {
		printLogo();
	}
</script>

<SvelteToast />
<ProgressBar class="text-primary-400 dark:text-primary-500" zIndex={60} />
<AutumnLeaves />
<!-- <Cherryblossom /> -->
<!-- <Snowflake /> -->
<!-- 이거 켠다음 다크모드를 기본으로 바꿀 것 -->

<slot />
