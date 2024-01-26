import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	const username = params.username;

	const user = prisma.user.findUnique({
		where: { username }
	});

	return { user };
};
