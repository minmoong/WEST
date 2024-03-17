<!--
	@component
	사용자의 역할 뱃지입니다.
-->
<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Role } from '@prisma/client';

	export let userRole: Role;
</script>

{#if userRole === 'STUDENT'}
	<Badge color="primary" rounded>학생</Badge>
{:else if userRole === 'TEACHER'}
	<Badge color="purple" rounded>선생님</Badge>
{:else if userRole === 'STUDENT_COUNCIL'}
	<Badge color="yellow" rounded>학생회</Badge>
{:else if userRole === 'ADMIN'}
	<Badge color="red" rounded>운영진</Badge>
{/if}
