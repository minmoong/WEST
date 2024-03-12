<!--
	@component
	인증코드 발송시에 사용되는 이메일 내용 템플릿입니다.
-->
<script lang="ts">
	import { Hr, Html, Text } from 'svelte-email';

	export let passcode: string;
</script>

<Html lang="ko">
	<Text>
		안녕하세요, WEST 입니다.
		<br />
		아래 인증 코드를 확인하고 사이트로 다시 돌아가 입력해 주세요.
	</Text>
	<Hr />
	<Text>인증 코드: {passcode}</Text>
</Html>
