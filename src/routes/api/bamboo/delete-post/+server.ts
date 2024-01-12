import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async (event) => {
	const { postId } = await event.request.json();

	const user = event.locals.user;
	if (!user) return json({ success: false });

	const post = await prisma.post.findUnique({
		where: { id: postId }
	});
	if (!post) return json({ success: false });

	if (post.authorId !== user.id) return json({ success: false });

	await prisma.post.update({
		where: { id: postId },
		data: { deleted: true }
	});

	return json({ success: true });
};
