import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(303, '/user-auth/login');
	} else if (event.locals.user) {
		throw redirect(303, '/protected');
	}
};
