import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/server/auth';

export const load = (event) => {
	logout(event.cookies);
	throw redirect(302, '/auth/login');
};
