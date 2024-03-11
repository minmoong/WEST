import type { Timetable } from '$lib/types/timetable/timetable';

/**
 * 컴시간에서 데이터를 가져옵니다.
 */
const requestData = async (reqUrl: string) => {
	const res = await fetch(reqUrl);
	const text = await res.text();

	const data = JSON.parse(text.substring(0, text.lastIndexOf('}') + 1));

	return data;
};

/**
 * 시간표 데이터를 조립합니다.
 * 해당 로직은 컴시간 시스템의 로직에 의존적이므로
 * 코드가 다소 명료하지 못할 수 있습니다.
 */
export const getTimetable = async (grade: number, klass: number) => {
	const data = await requestData('http://comci.net:4082/36179?NzM2MjlfNzE0MzNfMF8x');
	const timetable: Timetable = {};

	for (let weekday = 1; weekday < 6; weekday++) {
		for (let period = 1; period <= 8; period++) {
			const v1 = data['자료481'][grade][klass][weekday][period] ?? 0;
			const v2 = data['자료147'][grade][klass][weekday][period] ?? 0;

			let changed = false;
			if (v1 != v2) {
				changed = true;
			}

			let classroom = '';
			if (data['강의실'] == 1) {
				classroom = data['자료245'][grade][klass][weekday][period];
				if (Number(classroom) <= 0) classroom = '';
			}

			const div = data['분리'] ?? 100;
			const th = v2 == 100 ? Math.floor(v2 / div) : v2 % div;
			const sb = v2 == 100 ? v2 % div : Math.floor(v2 / div);
			let teacher = '';
			let subject = '';
			if (v2 > 100) {
				if (th < data['자료446'].length) {
					teacher = data['자료446'][th].substr(0, 2);
				}
				subject = data['자료492'][sb];
			}

			timetable[weekday] = timetable[weekday] ?? {};

			timetable[weekday][period] = {
				subject,
				teacher,
				changed
			};
		}
	}

	return timetable;
};
