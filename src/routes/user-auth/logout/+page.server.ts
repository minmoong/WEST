import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/utils/user-auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	logout(event.cookies);
	event.locals.user = undefined;
	throw redirect(303, '/user-auth/login');
};
