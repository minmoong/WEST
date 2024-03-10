import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { User } from '@prisma/client';

export const GET = async (event) => {
	const active = event.url.searchParams.get('active') === 'true';

	const user = event.locals.user as User;

	await prisma.user.update({
		where: { id: user.id },
		data: { active }
	});

	return json({});
};
