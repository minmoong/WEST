import { json } from '@sveltejs/kit';
import { getMeal } from '$lib/server/neis';

export const GET = async () => {
	const meal = await getMeal(new Date('2024-03-05'));

	return json({ meal });
};
