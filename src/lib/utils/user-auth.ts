import { EMAIL_SENDER_PW, JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';
import { prisma } from '$lib/server/prisma';
import { VerifyEmail } from '$lib/components';
import { getRandomNumber } from './tools';
import type { Cookies } from '@sveltejs/kit';
import type { Role } from '@prisma/client';

/**
 * username으로 JWT 토큰을 만들어 반환합니다.
 */
const createJwt = (username: string) => {
	const payload = {
		username
	};
	const options = {
		expiresIn: '7d'
	};

	return jwt.sign(payload, JWT_SECRET_KEY, options);
};

/**
 * 유저가 입력한 계정 등록 정보를 데이터베이스에 등록합니다.
 */
export const register = async (user: {
	username: string;
	password: string;
	email: string;
	grade: number;
	class: number;
	role: Role;
}) => {
	// 아이디 중복 검사
	let count = await prisma.user.count({
		where: {
			username: user.username
		}
	});

	if (count !== 0) {
		return { message: '이미 존재하는 아이디입니다.' };
	}

	// 이메일 중복 검사
	count = await prisma.user.count({
		where: {
			email: user.email
		}
	});

	if (count !== 0) {
		return { message: '이미 존재하는 이메일입니다. 이메일을 변경하고 다시 인증해 주세요.' };
	}

	// 유저 생성
	await prisma.user.create({
		data: {
			username: user.username,
			password: await bcrypt.hash(user.password, 12),
			email: user.email,
			grade: user.grade,
			class: user.class,
			role: user.role
		}
	});

	return { success: true };
};

/**
 * 유저가 입력한 로그인 정보로 데이터베이스에서 유저를 찾고 JWT 토큰을 만들어 반환합니다.
 */
export const login = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	});

	if (!user) {
		return { message: '존재하지 않는 아이디입니다.' };
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		return { message: '비밀번호가 일치하지 않습니다.' };
	}

	const jwt = createJwt(user.username);

	return { success: true, token: jwt };
};

/**
 * 로그인과 관련된 쿠키를 삭제하여 로그아웃합니다.
 */
export const logout = (cookies: Cookies) => {
	cookies.delete('Authorization', { path: '/' });
};

/**
 * 회원가입시 유저가 입력한 이메일로 인증 코드를 발송합니다.
 */
export const sendPasscodeToEmail = async (email: string) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'sdjin2023@gmail.com',
			pass: EMAIL_SENDER_PW
		}
	});

	const passcode = String(getRandomNumber(1000, 9999));

	await prisma.verifyEmailPasscode.upsert({
		where: { email },
		create: { email, passcode },
		update: { email, passcode }
	});

	const emailHtml = render({
		template: VerifyEmail,
		props: { passcode }
	});

	const options = {
		from: {
			name: 'SDJ 인트라넷',
			address: 'sdjin2023@gmail.com'
		},
		to: email,
		subject: '계정 이메일 인증',
		html: emailHtml
	};

	await transporter.sendMail(options);
};
