import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const TAKES_BY_ONE_REQUEST = 10;

export const POST = async ({ request }) => {
	const { pageNumber } = await request.json();

	const posts = await prisma.post.findMany({
		select: {
			id: true,
			createdAt: true,
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

	// +page.server.ts에서 페이지가 처음 로드될 때 15개를 가져가므로
	// countOfPost에서 15을 빼야 합니다.
	const isFullLoaded = countOfPosts - 15 <= pageNumber * TAKES_BY_ONE_REQUEST;

	return json({ posts, isFullLoaded });
};
