import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { sanitize } from '$lib/server/utils';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const category = data.get('category')?.toString();
		const title = data.get('title')?.toString();
		let content = data.get('content')?.toString();
		const anonymous = Boolean(data.get('anonymous'));

		if (!category) {
			return fail(400, { message: '카테고리를 입력해 주세요.' });
		}

		if (!title) {
			return fail(400, { message: '제목을 입력해 주세요.' });
		}

		if (!content) {
			return fail(400, { message: '내용을 입력해 주세요.' });
		}

		if (!locals.user) {
			return fail(400, { message: '잘못된 접근입니다. 로그인을 다시 진행해 주세요.' });
		}

		content = content.replaceAll(/(\n|\r\n)/g, '<br/>');
		content = sanitize(content);

		try {
			await prisma.post.create({
				data: {
					anonymous,
					category,
					grade: locals.user.grade,
					title,
					content,
					author: {
						connect: { id: locals.user.id }
					}
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { error: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}

		throw redirect(302, '/protected/bamboo');
	}
};
