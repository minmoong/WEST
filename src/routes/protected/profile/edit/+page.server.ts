import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { User } from '@prisma/client';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const editedUsername = data.get('username')?.toString();
		const editedBio = data.get('bio')?.toString();

		if (!editedUsername) {
			return fail(400, { message: '아이디를 입력해 주세요.' });
		}

		try {
			// 현재 아이디와 바꾸려고 하는 아이디가 다른 경우
			// 바꾸려고 하는 아이디가 이미 사용중일 수 있기 때문에 검사를 진행합니다.
			if (event.locals.user?.username !== editedUsername) {
				const count = await prisma.user.count({
					where: { username: editedUsername }
				});

				if (count !== 0) {
					return fail(400, { message: '이미 존재하는 아이디입니다.' });
				}
			}

			// 프로필을 업데이트합니다.
			await prisma.user.update({
				where: { id: (event.locals.user as User).id },
				data: {
					username: editedUsername,
					bio: editedBio
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}

		throw redirect(302, `/protected/profile/${editedUsername}`);
	}
};
