import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	const postId = Number(params.id);

	const post = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			author: {
				select: { username: true }
			},
			comment: {
				select: {
					createdAt: true,
					content: true,
					author: {
						select: {
							id: true,
							username: true
						}
					}
				}
			}
		}
	});

	return { post };
};

export const actions = {
	'upload-comment': async (event) => {
		const data = await event.request.formData();
		const comment = data.get('comment')?.toString();

		if (!comment) {
			return fail(400, { message: '댓글을 입력해 주세요.' });
		}

		try {
			const createdComment = await prisma.comment.create({
				data: {
					content: comment,
					post: {
						connect: { id: Number(event.params.id) }
					},
					author: {
						connect: { id: event.locals.user?.id }
					}
				},
				select: {
					createdAt: true,
					content: true,
					author: {
						select: {
							id: true,
							username: true
						}
					}
				}
			});

			return { createdComment };
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}
	}
};
