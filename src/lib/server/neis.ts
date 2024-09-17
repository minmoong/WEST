import { NEIS_API_KEY } from '$env/static/private';
import { formatDate } from '../utils/tools';

/**
 * NEIS API의 API endpoint에 따른 요청 주소를 반환합니다.
 */
const getApiUrl = (endpoint: string, params: Record<string, string>) => {
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

/**
 * NEIS API에게 데이터를 요청합니다.
 */
const requestNeis = async (endpoint: string, params: Record<string, string>) => {
	const res = await fetch(getApiUrl(endpoint, params));
	const data = await res.json();

	// 오류 발생시
	if (data.RESULT) {
		// 데이터가 존재하지 않을 때에는 빈 배열을 반환
		if (data.RESULT.CODE === 'INFO-200') {
			return [];
		}

		const code = data.RESULT.CODE;
		const message = data.RESULT.MESSAGE;

		throw new Error(
			`NEIS API 요청 중 오류가 발생하였습니다.\n에러코드: ${code}\n메시지: ${message}`
		);
	}

	return data[endpoint][1].row;
};

/**
 * NEIS API로부터 급식 데이터를 받아옵니다.
 */
export const getMeal = async (date: Date) => {
	const params = {
		MLSV_YMD: formatDate(date)
	};

	const data = await requestNeis('mealServiceDietInfo', params);

	const formatMealData = (mealData: any) => {
		const meals = mealData.DDISH_NM.split('<br/>').map((m: string) => {
			return {
				meal: m.split(' ')[0],
				allergy: m.split(' ')[1]
			};
		});

		return {
			meal: meals.map((m: any) => m.meal),
			allergy: meals.map((m: any) => m.allergy),
			kcal: mealData.CAL_INFO,
			ntr: mealData.NTR_INFO.replace(/\s+:/g, ':').split('<br/>')
		};
	};

	const lunchData = data.find((d: any) => d.MMEAL_SC_NM === '중식');
	const dinnerData = data.find((d: any) => d.MMEAL_SC_NM === '석식');

	return {
		lunch: lunchData ? formatMealData(lunchData) : { meal: [], kcal: '', ntr: '' },
		dinner: dinnerData ? formatMealData(dinnerData) : { meal: [], kcal: '', ntr: '' }
	};
};
