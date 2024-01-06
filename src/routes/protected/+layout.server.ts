import type { User } from '@prisma/client';

export const load = async (event) => {
	// hooks.server.ts에서 event.locals.user가 null이면
	// route protect를 해주기 때문에
	// event.locals.user는 null이 아니라서
	// User로 타입 캐스팅이 가능하다.
	const user = event.locals.user as User;

	return { user };
};
