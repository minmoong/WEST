import { json } from '@sveltejs/kit';
import { getTimetable } from '$lib/utils/comcigan';

export const GET = async ({ url }) => {
	const grade = Number(url.searchParams.get('grade'));
	const klass = Number(url.searchParams.get('class'));

	const timetable = await getTimetable(grade, klass);

	return json({ timetable });
};
