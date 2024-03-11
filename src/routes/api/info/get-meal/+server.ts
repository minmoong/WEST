import { json } from '@sveltejs/kit';
import { getMeal } from '$lib/server/neis';

export const GET = async ({ url }) => {
	const date = url.searchParams.get('date');

	if (!date) return json({});

	const meal = await getMeal(new Date(date));

	return json({ meal });
};
