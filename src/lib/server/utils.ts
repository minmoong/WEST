import sanitizeHtml from 'sanitize-html';

/**
 * XSS 공격을 방지하기 위해 사용자가 입력한 문자열에 존재하는 태그들을 삭제합니다.
 * 예를 들어, 사용자가 입력한 문자열 <script>alert('xss attack!')</script>는
 * 이 함수에 의하여 빈 문자열로 소독됩니다.
 */
export const sanitize = (html: string) => {
	const options = {
		allowedTags: ['br']
	};
	return sanitizeHtml(html, options);
};
