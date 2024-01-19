import { error, redirect } from '@sveltejs/kit';
import { authUser } from '$lib/server/auth';

export const handle = async ({ event, resolve }) => {
	// 유저 인증
	try {
		const user = await authUser(event.cookies);

		if (user) {
			event.locals.user = user;
		}
	} catch (err) {
		console.error(err);
		throw error(500, {
			message:
				'해당 계정을 인증하는 과정에 실패하였습니다. 문제가 지속될 경우 사이트 쿠키를 삭제하고 다시 접속해주세요.'
		});
	}

	// 라우트 프로텍팅
	const pathname = event.url.pathname;

	if (!pathname.startsWith('/auth')) {
		if (!event.locals.user) {
			throw redirect(302, '/auth/login');
		}
	} else if (pathname === '/auth/login' || pathname === '/auth/register') {
		if (event.locals.user) {
			throw redirect(302, '/protected');
		}
	}

	const response = await resolve(event);
	return response;
};
