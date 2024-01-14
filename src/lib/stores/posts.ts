import { get, writable } from 'svelte/store';
import type { PostPreview } from '$lib/types/bamboo/post';

type PostStoreData = {
	data: PostPreview[];
	pageNumber: number;
	isFullLoaded: boolean;
};

/**
 * 서버로부터 새 글(미리보기용 데이터)을 받아오고
 * 그 새 글과 더 받아올 글이 남아있는지 여부를 리턴합니다.
 */
const loadNewPosts = async (
	prevValue: PostStoreData
): Promise<{ newPosts: PostPreview[]; isFullLoaded: boolean }> => {
	const body = {
		pageNumber: prevValue.pageNumber
	};
	const init = {
		method: 'POST',
		body: JSON.stringify(body)
	};

	const res = await fetch('/api/bamboo/get-posts', init);
	const data = await res.json();

	const newPosts = data.posts.map((i: PostPreview) => ({ ...i, createdAt: new Date(i.createdAt) }));
	const isFullLoaded = data.isFullLoaded;

	return { newPosts, isFullLoaded };
};

export const posts = writable<PostStoreData>({
	data: [],
	pageNumber: 0,
	isFullLoaded: false
});

/**
 * posts 스토어를 업데이트합니다.
 */
export const updateNewPosts = async () => {
	const { newPosts, isFullLoaded } = await loadNewPosts(get(posts));

	posts.update((previousValue) => ({
		data: [...previousValue.data, ...newPosts],
		pageNumber: previousValue.pageNumber + 1,
		isFullLoaded
	}));
};
