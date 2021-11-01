import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useCancelToken = () => {
	const axiosSource = useRef(null);
	const newCancelToken = useCallback(() => {
		axiosSource.current = axios.CancelToken.source();
		return axiosSource.current.token;
	}, []);

	useEffect(
		() => () => {
			if (axiosSource.current) axiosSource.current.cancel();
		},
		[],
	);

	return { newCancelToken };
};
