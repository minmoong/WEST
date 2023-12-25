import type { RequestEvent } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { prisma } from './db/prisma';
import { JWT_SECRET_KEY } from '$env/static/private';

export const authenticateUser = async (event: RequestEvent) => {
	const token = event.cookies.get('Authorization')?.split(' ')[1];

	if (!token) return null;

	const jwtUser = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

	const user = await prisma.user.findUnique({
		where: {
			username: jwtUser.username
		}
	});

	return user;
};
