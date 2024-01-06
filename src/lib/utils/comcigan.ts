const getComciganData = async (reqUrl: string) => {
	const res = await fetch(reqUrl);
	const text = await res.text();
	const data = JSON.parse(text.substring(0, text.lastIndexOf('}') + 1));

	return data;
};

export class ComciganStudent {
	private dataReqUrl = 'http://comci.kr:4082/36179?NzM2MjlfNzE0MzNfMF8x';
	public data: any;

	async init() {
		this.data = await getComciganData(this.dataReqUrl);
	}

	/**
	 * 이 함수의 소스 코드는 컴시간 웹사이트에서 사용하는 로직에 의존적입니다.
	 * 따라서 가독성이 떨어질 수 있습니다.
	 */
	static parse(data: any, grd: number, cls: number) {
		const timetable: any = {};

		for (let weekday = 1; weekday < 6; weekday++) {
			for (let period = 1; period <= 8; period++) {
				const v1 = data['자료481'][grd][cls][weekday][period] ?? 0;
				const v2 = data['자료147'][grd][cls][weekday][period] ?? 0;

				// 강의실 데이터를 추출합니다.
				let classroom: any = '';
				if (data['강의실'] === 1) {
					classroom = data['자료245'][grd][cls][weekday][period];
					if (classroom <= 0) classroom = '';
				}

				// 시간표 변경 여부를 추출합니다.
				let changed: boolean = false;
				if (v1 !== v2) changed = true;

				// 선생님의 성함과 과목을 추출합니다.
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
					a: subject ?? '',
					b: teacher ?? '',
					changed
				};
			}
		}

		return timetable;
	}
}

export class ComciganTeacher {
	private dataReqUrl = 'http://comci.kr:4082/36179_T?NzM2MjlfNzE0MzNfMF8x';
	public data: any;

	async init() {
		this.data = await getComciganData(this.dataReqUrl);
	}

	/**
	 * 이 함수의 소스 코드는 컴시간 웹사이트에서 사용하는 로직에 의존적입니다.
	 * 따라서 가독성이 떨어질 수 있습니다.
	 */
	static parse(data: any, ti: number) {
		const mTh = (n1: number, n2: number) => {
			if (n2 == 100) return Math.floor(n1 / n2);
			return n1 % n2;
		};
		const mSb = (n1: number, n2: number) => {
			if (n2 == 100) return n1 % n2;
			return Math.floor(n1 / n2);
		};
		const 교사시간표_원자료생성 = (data: any) => {
			let 분리, sb, 교사1;
			if (data['분리'] === undefined) {
				분리 = 100;
			} else {
				분리 = data['분리'];
			}
			data['시간표2'] = [];
			for (let 교사 = 1; 교사 <= data['교사수']; 교사++) {
				data['시간표2'][교사] = [];
				for (let 요일 = 1; 요일 < 6; 요일++) {
					data['시간표2'][교사][요일] = [];
					for (let 교시 = 1; 교시 <= 8; 교시++) {
						data['시간표2'][교사][요일][교시] = 0;
					}
				}
			}
			for (let 학년 = 1; 학년 <= 3; 학년++) {
				for (let 반 = 1; 반 <= data['학급수'][학년]; 반++) {
					for (let 요일 = 1; 요일 < 6; 요일++) {
						for (let 교시 = 1; 교시 <= 8; 교시++) {
							const 원자료 = data['자료481'][학년][반][요일][교시] ?? 0;
							const 교사2 = 0;
							if (원자료 > 0) {
								교사1 = mTh(원자료, 분리);
								if (교사1 <= data['교사수']) {
									sb = mSb(원자료, 분리);
									if (분리 == 100) {
										data['시간표2'][교사1][요일][교시] = (학년 * 100 + 반) * 분리 + sb;
										if (교사2 > 0)
											data['시간표2'][교사2][요일][교시] = (학년 * 100 + 반) * 분리 + sb;
									} else {
										data['시간표2'][교사1][요일][교시] = sb * 분리 + 학년 * 100 + 반;
										if (교사2 > 0) data['시간표2'][교사2][요일][교시] = sb * 분리 + 학년 * 100 + 반;
									}
								}
							}
						}
					}
				}
			}
		};
		교사시간표_원자료생성(data);

		const timetable: any = {};
		let changed: boolean;

		let 원자료, 교사자료;
		const 교사 = ti,
			분리 = data['분리'] ?? 100;
		for (let 요일 = 1; 요일 < 6; 요일++) {
			for (let 교시 = 1; 교시 <= 8; 교시++) {
				let sb: any, cls;
				교사자료 = data['자료542'][교사][요일][교시] ?? 0;
				원자료 = data['시간표2'][교사][요일][교시] ?? 0;

				if (원자료 == 교사자료) {
					changed = false;
				} else {
					changed = true;
				}

				if (교사자료 > 100) {
					if (분리 == 100) {
						cls = mTh(교사자료, 분리);
						sb = mSb(교사자료, 분리);
						sb %= 분리;
					} else {
						cls = mTh(교사자료, 분리);
						sb = mSb(교사자료, 분리);
						sb %= 분리;
					}
				}

				const subject = data['자료492'][sb];

				timetable[요일] = timetable[요일] ?? {};

				timetable[요일][교시] = {
					a: cls ?? '',
					b: subject ?? '',
					changed
				};
			}
		}

		return timetable;
	}
}
