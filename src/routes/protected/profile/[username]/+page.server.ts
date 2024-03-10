import { prisma } from '$lib/server/prisma';

export const load = async (event) => {
	const username = event.params.username;

	const profileUser = await prisma.user.findUnique({
		where: { username }
	});

	const isMyProfile = event.locals.user?.id === profileUser?.id;

	return { profileUser, isMyProfile };
};
