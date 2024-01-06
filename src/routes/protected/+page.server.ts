import { ComciganStudent } from '$lib/utils/comcigan';
import { getMeal } from '$lib/utils/neis';

export const load = async () => {
	const meal = await getMeal(new Date());

	const comciganStudent = new ComciganStudent();
	await comciganStudent.init();

	return {
		meal,
		timetable: {
			stData: comciganStudent.data
		}
	};
};
