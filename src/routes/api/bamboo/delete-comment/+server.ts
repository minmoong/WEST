import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async (event) => {
	const { commentId } = await event.request.json();

	const user = event.locals.user;
	if (!user) return json({ success: false });

	const comment = await prisma.comment.findUnique({
		where: { id: commentId }
	});
	if (!comment) return json({ success: false });

	if (comment.authorId !== user.id) return json({ success: false });

	await prisma.comment.delete({
		where: { id: commentId }
	});

	return json({ success: true });
};
