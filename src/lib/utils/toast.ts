import { toast } from '@zerodevx/svelte-toast';

/**
 * 토스트 메시지의 옵션을 반환합니다.
 */
const getOptions = (message: string) => {
	const options = {
		duration: 4000
	};

	if (message.length > 18) {
		options.duration = 7000;
	}

	return options;
};

export const toastError = (message: string) => {
	const opt = getOptions(message);

	toast.push(message, {
		theme: {
			'--toastBackground': '#ef5154',
			'--toastBarBackground': '#d1180b'
		},
		...opt
	});
};

export const toastSuccess = (message: string) => {
	const opt = getOptions(message);

	toast.push(message, {
		theme: {
			'--toastBackground': '#48bb78',
			'--toastBarBackground': '#2f855a'
		},
		...opt
	});
};
