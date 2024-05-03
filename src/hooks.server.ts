import { redirect } from '@sveltejs/kit';
import { authUser } from '$lib/server/auth';

export const handle = async ({ event, resolve }) => {
	// 유저 인증
	try {
		const user = await authUser(event.cookies);

		if (user) {
			event.locals.user = user;
		}
	} catch (err) {
		event.cookies.delete('Authorization', { path: '/' });
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
