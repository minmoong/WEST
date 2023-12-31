import { fail, type Actions, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { register, sendPasscodeToEmail } from '$lib/utils/user-auth';
import { checkIsEmail, checkRoleFromEmail } from '$lib/utils/tools';

export const actions: Actions = {
	register: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const passwordCheck = data.get('password-check')?.toString();
		const email = data.get('email')?.toString();
		const passcode = data.get('passcode')?.toString();
		const grade = Number(data.get('grade'));
		const classNumber = Number(data.get('class'));

		// 입력 검사하기
		if (!username) {
			return fail(400, { message: '아이디를 입력해 주세요.' });
		}

		if (username.length > 15) {
			return fail(400, { message: '아이디의 길이는 15자 이하여야 합니다.' });
		}

		if (!password) {
			return fail(400, { message: '비밀번호를 입력해 주세요.' });
		}

		if (password.length > 20 || password.length < 8) {
			return fail(400, { message: '비밀번호의 길이는 8자 이상, 20자 이하여야 합니다.' });
		}

		if (password != passwordCheck) {
			return fail(400, { message: '비밀번호가 같지 않습니다.' });
		}

		if (!email) {
			return fail(400, { message: '이메일을 입력해 주세요.' });
		}

		if (!passcode) {
			return fail(400, { message: '인증 코드를 입력해 주세요.' });
		}

		if (!grade) {
			return fail(400, { message: '학년을 선택해 주세요.' });
		}

		if (!classNumber) {
			return fail(400, { message: '반을 선택해 주세요.' });
		}

		// 인증코드 일치 여부 확인하기
		const verifyEmailPasscode = await prisma.verifyEmailPasscode.findUnique({
			where: {
				email
			}
		});

		if (!verifyEmailPasscode) {
			return fail(400, { message: '메일 인증을 다시 시도해 주세요.' });
		}

		if (verifyEmailPasscode?.passcode !== passcode) {
			await prisma.verifyEmailPasscode.delete({
				where: {
					email
				}
			});

			return fail(400, {
				message: '인증 코드가 일치하지 않습니다. 메일 인증을 다시 시도해 주세요.'
			});
		}

		// 계정 등록하기
		try {
			// 역할 결정
			const role = checkRoleFromEmail(email);

			const user = { username, password, email, grade, class: classNumber, role };
			const result = await register(user);

			if (!result.success) {
				return fail(400, { message: result.message });
			}

			await prisma.verifyEmailPasscode.delete({
				where: {
					email
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}

		throw redirect(303, '/user-auth/login');
	},
	'verify-email': async (event) => {
		const data = await event.request.formData();
		const email = data.get('email')?.toString();

		if (!email) {
			return fail(400, { message: '이메일을 입력해 주세요.' });
		}

		if (!checkIsEmail(email)) {
			return fail(400, { message: '이메일의 형식이 올바르지 않습니다.' });
		}

		if (email.split('@')[1] !== 'sdjhs.djsch.kr') {
			return fail(400, { message: '이메일은 서고 이메일이여야 합니다.' });
		}

		try {
			await sendPasscodeToEmail(email);
		} catch (err) {
			console.error(err);
			return fail(500, { message: '내부적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.' });
		}
	}
};
