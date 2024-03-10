import type { User } from '@prisma/client';

export const load = async (event) => {
	const user = event.locals.user as User;

	return { user };
};
