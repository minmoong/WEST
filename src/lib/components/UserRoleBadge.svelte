<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Role } from '@prisma/client';

	export let userRole: Role;
</script>

{#if userRole === 'STUDENT'}
	<Badge color="green" rounded>학생</Badge>
{:else if userRole === 'TEACHER'}
	<Badge color="green" rounded>선생님</Badge>
{:else if userRole === 'STUDENT_COUNCIL'}
	<Badge color="yellow" rounded>학생회</Badge>
{/if}
