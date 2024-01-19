import { browser } from '$app/environment';

/**
 * 이전 페이지로 돌아갑니다.
 */
export const goBack = () => {
	if (browser) window.history.back();
};
