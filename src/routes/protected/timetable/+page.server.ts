import { Comcigan, ComciganTeacher } from '$lib/utils/comcigan';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const comcigan = new Comcigan();
	await comcigan.init();

	const comciganTeacher = new ComciganTeacher();
	await comciganTeacher.init();

	return {
		comcigan: {
			stData: comcigan.data,
			thData: comciganTeacher.data
		}
	};
};
