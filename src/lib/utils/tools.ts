import type { Role } from '@prisma/client';

/**
 * 이메일의 형식인지 체크합니다.
 */
export const checkIsEmail = (string: string) => {
	const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

	return emailRegex.test(string);
};

export const checkRoleFromEmail = (email: string): Role => {
	const regex = [
		/^[0-9]{2}sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 23년도 기준 1학년
		/sdj[0-9]{3}@sdjhs\.djsch\.kr$/, // 23년도 기준 2학년
		/sdjgo[0-9]{8}@sdjhs\.djsch\.kr$/ // 23년도 기준 3학년
	];

	if (regex[0].test(email) || regex[1].test(email) || regex[2].test(email)) {
		return 'STUDENT';
	} else {
		return 'TEACHER';
	}
};

/**
 * 최솟값과 최댓값 사이의 난수를 생성합니다.
 */
export const getRandomNumber = (min: number, max: number) => {
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
