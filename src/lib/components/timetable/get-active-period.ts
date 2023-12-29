export const getActivePeriod = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	let activePeriod: number;

	if ((hours === 8 && minutes >= 20) || (hours === 9 && minutes < 20)) {
		activePeriod = 1;
	} else if ((hours === 9 && minutes >= 20) || (hours === 10 && minutes < 20)) {
		activePeriod = 2;
	} else if ((hours === 10 && minutes >= 20) || (hours === 11 && minutes < 20)) {
		activePeriod = 3;
	} else if ((hours === 11 && minutes >= 20) || (hours === 12 && minutes < 20)) {
		activePeriod = 4;
	} else if ((hours === 12 && minutes >= 20) || (hours === 13 && minutes <= 59)) {
		activePeriod = 5;
	} else if (hours === 14 && minutes >= 0) {
		activePeriod = 6;
	} else if (hours === 15 && minutes >= 0) {
		activePeriod = 7;
	} else {
		activePeriod = -1;
	}

	return activePeriod;
};
