import { get, writable } from 'svelte/store';
import type { PostPreview } from '$lib/types/bamboo/post';

type PostStoreData = {
	data: PostPreview[];
	pageNumber: number;
	isFullLoaded: boolean;
};

export const posts = writable<PostStoreData>({
	data: [],
	pageNumber: 0,
	isFullLoaded: false
});

/**
 * posts 스토어에 새 글을 추가합니다.
 */
export const loadNewPosts = async () => {
	const { newPosts, isFullLoaded } = await fetchPosts(get(posts));

	posts.update((previousValue) => ({
		data: [...previousValue.data, ...newPosts],
		pageNumber: previousValue.pageNumber + 1,
		isFullLoaded
	}));
};

/**
 * posts 스토어를 리셋합니다.
 */
export const resetPostsStore = () => {
	posts.set({
		data: [],
		pageNumber: 0,
		isFullLoaded: false
	});
};

/**
 * 서버로부터 새 글(미리보기용 데이터)을 받아오고
 * 그 새 글과 더 받아올 글이 남아있는지 여부를 리턴합니다.
 */
const fetchPosts = async (
	prevValue: PostStoreData
): Promise<{ newPosts: PostPreview[]; isFullLoaded: boolean }> => {
	const params = new URLSearchParams({
		'page-number': prevValue.pageNumber.toString()
	});

	const res = await fetch(`/api/bamboo/get-posts?${params.toString()}`);
	const data = await res.json();

	const newPosts = data.posts.map((i: PostPreview) => ({ ...i, createdAt: new Date(i.createdAt) }));
	const isFullLoaded = data.isFullLoaded;

	return { newPosts, isFullLoaded };
};
