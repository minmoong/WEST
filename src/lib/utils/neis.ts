import { formatDate } from './tools';
import { NEIS_API_KEY } from '$env/static/private';

/**
 * NEIS API의 API endpoint에 따른 요청 주소를 반환합니다.
 */
const getReqUrl = (endpoint: string, params: Record<string, string>) => {
	const defaultUrlParams = new URLSearchParams({
		KEY: NEIS_API_KEY,
		Type: 'json',
		ATPT_OFCDC_SC_CODE: 'G10',
		SD_SCHUL_CODE: '7430059'
	});
	const urlParams = new URLSearchParams(params);
	const reqUrl = `https://open.neis.go.kr/hub/${endpoint}?${defaultUrlParams}&${urlParams}`;

	return reqUrl;
};

const requestNEIS = async (endpoint: string, params: Record<string, string>) => {
	const data = await fetch(getReqUrl(endpoint, params)).then((res) => res.json());

	// 오류 발생시
	if (data.RESULT) {
		if (data.RESULT.CODE === 'INFO-200') {
			return [];
		}

		const code = data.RESULT.CODE;
		const errMsg = data.RESULT.MESSAGE;

		throw new Error(
			`NEIS API 요청 중 오류가 발생하였습니다.\n에러코드: ${code}\n메시지: ${errMsg}`
		);
	}

	return Object.values((Object.values(data) as object[][])[0][1])[0];
};

/**
 * NEIS API로부터 급식 데이터를 받아옵니다.
 */
export const getMeal = async (date: Date) => {
	const params = {
		MLSV_YMD: formatDate(date)
	};
	const data = await requestNEIS('mealServiceDietInfo', params);
	const lunch = data[0]?.DDISH_NM.split('<br/>').map((m: string) => m.split(' ')[0]) ?? [];
	const dinner = data[1]?.DDISH_NM.split('<br/>').map((m: string) => m.split(' ')[0]) ?? [];

	return { lunch, dinner };
};
