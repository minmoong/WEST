import { ComciganStudent, ComciganTeacher } from '$lib/utils/comcigan';
import { getMeal } from '$lib/server/neis';

export const load = async () => {
	const meal = await getMeal(new Date());

	const comciganStudent = new ComciganStudent();
	await comciganStudent.init();

	const comciganTeacher = new ComciganTeacher();
	await comciganTeacher.init();

	return {
		meal,
		timetable: {
			stData: comciganStudent.data,
			thData: comciganTeacher.data
		}
	};
};
