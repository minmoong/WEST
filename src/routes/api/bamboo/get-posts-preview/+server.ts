import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const TAKES_BY_ONE_REQUEST = 15;

export const GET = async ({ url }) => {
	const pageNumber = Number(url.searchParams.get('page-number'));

	const posts = await prisma.post.findMany({
		select: {
			id: true,
			createdAt: true,
			anonymous: true,
			category: true,
			title: true,
			views: true,
			author: {
				select: { username: true }
			}
		},
		skip: pageNumber * TAKES_BY_ONE_REQUEST,
		take: TAKES_BY_ONE_REQUEST,
		orderBy: {
			id: 'desc'
		}
	});

	const countOfPosts = await prisma.post.count();

	// pageNumber는 0부터 시작하기 때문에,
	// 총 몇 개를 가져갔는지 계산하기 위해서는 1을 더해줘야 합니다.
	const isFullLoaded = countOfPosts <= (pageNumber + 1) * TAKES_BY_ONE_REQUEST;

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];

		if (post.anonymous) {
			if (post.author?.username) {
				post.author.username = '(익명)';
			}
		}

		posts[i] = post;
	}

	return json({ posts, isFullLoaded });
};
