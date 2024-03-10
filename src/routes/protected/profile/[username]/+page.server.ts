import { prisma } from '$lib/server/prisma';

export const load = async (event) => {
	const username = event.params.username;

	const profileUser = await prisma.user.findUnique({
		where: { username }
	});

	return { profileUser };
};
