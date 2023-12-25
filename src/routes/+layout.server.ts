import { Comcigan } from '$lib/utils/comcigan';
import { getMeal } from '$lib/utils/neis';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		const meal = await getMeal(new Date());
		const comcigan = new Comcigan();
		await comcigan.init();
		const timetable = Comcigan.parse(comcigan.data, user.grade, user.class);

		return {
			user,
			meal,
			timetable
		};
	}
};
