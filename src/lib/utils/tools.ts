import type { Role } from '@prisma/client';

/**
 * 이메일의 형식인지 체크합니다.
 */
export const isEmailFormat = (string: string) => {
	const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

	return emailRegex.test(string);
};

/**
 * 이메일의 형식으로 학생/선생님 역할을 반환합니다.
 */
export const getRoleFromEmail = (email: string): Role => {
	const regex = [
		/^25sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 25년도 기준 1학년
		/^24sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 24년도 기준 1학년
		/^23sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 24년도 기준 2학년
		/sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 24년도 기준 3학년
		/sdjgo[0-9]{8}@sdjhs\.djsch\.kr$/ // 24년도 졸업생
	];

	const isStudent = regex.some((r) => r.test(email));

	return isStudent ? 'STUDENT' : 'TEACHER';
};

/**
 * 최솟값과 최댓값을 포함하여 난수를 생성합니다.
 */
export const getRandomNumberInRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Date를 인자로 받아 20231213과 같은 문자열 형태로 반환합니다.
 * delimiter의 값을 '.' 으로 주면 2023.12.13과 같이 반환합니다.
 */
export const formatDate = (date: Date, delimiter: string = '') => {
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);

	return [year, month, day].join(delimiter);
};

/**
 * 년, 월, 일, 시, 분, 초 정보를 문자열 형태로 반환합니다.
 */
export const formatDatetime = (date: Date, d1: string = '.', d2: string = ':') => {
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const hour = ('0' + date.getHours()).slice(-2);
	const minute = ('0' + date.getMinutes()).slice(-2);
	const second = ('0' + date.getSeconds()).slice(-2);

	return [[year, month, day].join(d1), [hour, minute, second].join(d2)].join(' ');
};

/**
 * 웹 사이트 접속 시 콘솔에 메시지를 출력합니다.
 */
export const printLogo = () => {
	const logo = `
		%c██╗    ██╗███████╗███████╗████████╗
		%c██║    ██║██╔════╝██╔════╝╚══██╔══╝
		%c██║ █╗ ██║█████╗  ███████╗   ██║
		%c██║███╗██║██╔══╝  ╚════██║   ██║
		%c╚███╔███╔╝███████╗███████║   ██║
		%c ╚══╝╚══╝ ╚══════╝╚══════╝   ╚═╝
    
		%c개발자 도구 사용법을 알고있나요?! 저랑 사이트 개발 같이 하실래요??
	`;

	console.log(
		logo,
		'color:#ff1a43',
		'color:#ff8d26',
		'color:#fff444',
		'color:#80fc78',
		'color:#3a9af5',
		'color:#ce00f1',
		'font-size:17px;font-weight:bold'
	);
};

/**
 * 현재 시간을 기준으로 교시를 반환합니다.
 * 각 교시는 특정 시간 범위에 해당하며, 현재 시간이 그 범위에 속하면 해당 교시 값을 반환합니다.
 */
export const getActivePeriod = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const timePeriods = [
		{ start: '8:10', end: '9:09', period: 1 },
		{ start: '9:10', end: '10:09', period: 2 },
		{ start: '10:10', end: '11:09', period: 3 },
		{ start: '11:10', end: '12:09', period: 4 },
		{ start: '12:10', end: '13:49', period: 5 },
		{ start: '13:50', end: '14:49', period: 6 },
		{ start: '14:50', end: '15:49', period: 7 }
	];

	for (const period of timePeriods) {
		const { start, end, period: activePeriod } = period;
		const [startHour, startMinute] = start.split(':').map((t) => Number(t));
		const [endHour, endMinute] = end.split(':').map((t) => Number(t));

		if (
			(hours === startHour && minutes >= startMinute) ||
			(hours === endHour && minutes <= endMinute)
		) {
			return activePeriod;
		}
	}

	return -1;
};

/**
 * 인자로 전달된 날짜와 현재 날짜 사이의 시간 차이를 계산하여,
 * 적절한 형태의 문자열(예: '5분 전', '3일 전' 등)로 반환하는 함수입니다.
 */
export const calculateElapsedTime = (time: Date) => {
	const milliSeconds = Number(new Date()) - Number(time);
	const seconds = milliSeconds / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const weeks = days / 7;
	const months = days / 30;
	const years = days / 365;

	if (seconds < 60) return '방금 전';
	if (minutes < 60) return `${Math.floor(minutes)}분 전`;
	if (hours < 24) return `${Math.floor(hours)}시간 전`;
	if (days < 7) return `${Math.floor(days)}일 전`;
	if (weeks < 5) return `${Math.floor(weeks)}주 전`;
	if (months < 12) return `${Math.floor(months)}개월 전`;

	return Math.floor(years) + '년 전';
};
