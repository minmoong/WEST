import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async (event) => {
	// TODO: bamboo was archived
	// const { postId } = await event.request.json();

	// const user = event.locals.user;
	// if (!user) return json({ success: false });

	// const post = await prisma.post.findUnique({
	// 	where: { id: postId }
	// });
	// if (!post) return json({ success: false });

	// if (post.authorId !== user.id) return json({ success: false });

	// // Post 테이블의 데이터를 지우고
	// // DeletedPost 테이블로 옮깁니다.
	// const deletedPost = await prisma.post.delete({
	// 	where: { id: postId },
	// 	include: { comment: true }
	// });

	// await prisma.deletedPost.create({
	// 	data: {
	// 		id: deletedPost.id,
	// 		createdAt: deletedPost.createdAt,
	// 		anonymous: deletedPost.anonymous,
	// 		category: deletedPost.category,
	// 		title: deletedPost.title,
	// 		content: deletedPost.content,
	// 		views: deletedPost.views,
	// 		authorId: deletedPost.authorId as number,
	// 		commentIds: deletedPost.comment.map((comment) => comment.id)
	// 	}
	// });

	return json({ success: true });
};
