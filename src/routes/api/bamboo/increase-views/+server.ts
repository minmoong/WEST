import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ request }) => {
	const { postId } = await request.json();

	const post = await prisma.post.update({
		where: { id: postId },
		data: {
			views: { increment: 1 }
		}
	});

	return json({ views: post.views });
};
