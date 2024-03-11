export type Timetable = {
	[weekday: string]: {
		[period: string]: {
			subject: string;
			teacher: string;
			changed: boolean;
		};
	};
};
