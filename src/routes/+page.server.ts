import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/auth/login');
	} else if (event.locals.user) {
		throw redirect(302, '/protected');
	}
};
