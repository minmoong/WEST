<!--
	@component
  년도가 바뀌면 유저 DB를 초기화하고 이를 알려주는 모달입니다.
-->
<script lang="ts">
	import { Modal } from 'flowbite-svelte';

	let showModal = true;
</script>

<Modal title="새로 가입해주세요 🆕" size="xs" bind:open={showModal}>
	<div class="font-normal">
		년도가 바뀌어 2025년 3월 11일에 데이터베이스를 초기화하였습니다.
		<br /><br />
		이어서 사용하려면, 새로운 학년/반으로 새로 가입해 주세요.
		<br /><br />
		새로 가입한 이후 이 알림창은 무시해도 됩니다.
		<br /><br />
		<span class="mb-2 text-sm font-normal">
			가입시 선택한 학년/반은 사이트에서 수정 불가능하니 신중히 선택하시기 바랍니다. (수정 문의:
			23sdj102@sdjhs.djsch.kr)
		</span>
	</div>
</Modal>
