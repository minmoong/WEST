import { prisma } from '$lib/server/prisma';

export const load = async () => {
	const posts = await prisma.post.findMany({
		select: {
			createdAt: true,
			category: true,
			title: true,
			views: true,
			author: {
				select: {
					username: true
				}
			}
		},
		orderBy: {
			id: 'desc'
		}
	});

	return { posts };
};
