import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { logout } from '$lib/utils/user-auth';

export const load: PageServerLoad = (event) => {
	logout(event.cookies);
	event.locals.user = null;
	throw redirect(303, '/user-auth/login');
};
