import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';
import type { Cookies } from '@sveltejs/kit';
import type { JwtPayload } from 'jsonwebtoken';

export const getUserFromCookie = async (cookies: Cookies) => {
	const token = cookies.get('Authorization')?.split(' ')[1];

	if (!token) return null;

	const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

	const user = await prisma.user.findUnique({
		where: { username: payload.username }
	});

	return user;
};
