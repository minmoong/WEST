import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ url }) => {
	const take = Number(url.searchParams.get('take'));

	const comments = await prisma.comment.findMany({
		select: {
			createdAt: true,
			content: true,
			postId: true
		},
		take,
		orderBy: {
			id: 'desc'
		}
	});

	return json({ comments });
};
