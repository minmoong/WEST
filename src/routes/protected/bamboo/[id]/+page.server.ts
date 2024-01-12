import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	const postId = Number(params.id);

	const post = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			author: {
				select: { username: true }
			}
		}
	});

	return { post };
};
