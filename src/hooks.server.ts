import { authenticateUser } from '$lib/server/authenticate-user';
import { error, redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	try {
		event.locals.user = await authenticateUser(event);
	} catch (err) {
		console.error(err);
		throw error(500, {
			message:
				'해당 계정을 인증하는 과정에 실패하였습니다. 문제가 지속될 경우 쿠키를 삭제하고 다시 접속해주세요.'
		});
	}

	if (pathname.startsWith('/protected')) {
		if (!event.locals.user) {
			throw redirect(303, '/user-auth/login');
		}
	} else if (pathname == '/user-auth/login' || pathname == '/user-auth/register') {
		if (event.locals.user) {
			throw redirect(303, '/protected');
		}
	}

	const response = await resolve(event);
	return response;
};
