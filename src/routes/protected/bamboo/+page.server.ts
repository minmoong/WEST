import { prisma } from '$lib/server/prisma';

// 이 변수의 값은 /api/get-posts/+server.ts의
// TAKES_BY_ONE_REQUEST 변수의 값과 동일해야 합니다.
const TAKES_BY_INITIAL = 10;

export const load = async () => {
	const posts = await prisma.post.findMany({
		select: {
			createdAt: true,
			category: true,
			title: true,
			views: true,
			author: {
				select: {
					username: true
				}
			}
		},
		take: TAKES_BY_INITIAL,
		orderBy: {
			id: 'desc'
		}
	});

	const countOfPosts = await prisma.post.count();

	const isFullLoaded = countOfPosts <= TAKES_BY_INITIAL;

	return { posts, isFullLoaded };
};
