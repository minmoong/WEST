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
					id: true,
					createdAt: true,
					anonymous: true,
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

	if (post) {
		if (post.anonymous) {
			if (post.author?.username) {
				post.author.username = '(익명)';
			}
		}

		post.comment = post.comment.map((c) => {
			if (c.anonymous) {
				if (c.author) {
					c.author.username = '(익명)';
				}
			}

			return c;
		});
	}

	return { post };
};

export const actions = {
	'upload-comment': async (event) => {
		const data = await event.request.formData();
		const comment = data.get('comment')?.toString();
		const anonymous = Boolean(data.get('anonymous'));

		if (!comment) {
			return fail(400, { message: '댓글을 입력해 주세요.' });
		}

		try {
			const createdComment = await prisma.comment.create({
				data: {
					anonymous,
					content: comment,
					post: {
						connect: { id: Number(event.params.id) }
					},
					author: {
						connect: { id: event.locals.user?.id }
					}
				},
				select: {
					id: true,
					createdAt: true,
					anonymous: true,
					content: true,
					author: {
						select: {
							id: true,
							username: true
						}
					}
				}
			});

			if (createdComment.anonymous) {
				if (createdComment.author) {
					createdComment.author.username = '(익명)';
				}
			}

			return { createdComment };
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}
	}
};
