import { fail, redirect } from '@sveltejs/kit';
import { login } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username) {
			return fail(400, { message: '아이디를 입력해 주세요.' });
		}

		if (!password) {
			return fail(400, { message: '비밀번호를 입력해 주세요.' });
		}

		try {
			const result = await login(username, password);

			if (!result.success) {
				return fail(400, { message: result.message });
			}

			const token = result.token;
			event.cookies.set('Authorization', `Bearer ${token}`, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}

		throw redirect(302, '/protected');
	}
};
