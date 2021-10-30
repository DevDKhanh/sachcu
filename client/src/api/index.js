import axios from 'axios';
import { getItemStorage } from '../utils/localStorage';
import { API_URL } from '../constant/config';
import queryString from 'query-string';

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
		Authorization: `Bearer ${getItemStorage('accessToken')}`,
	},
	baseURL: API_URL,
	paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
	return config;
});

axiosClient.interceptors.response.use(
	response => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	error => {
		throw error;
	},
);

export default axiosClient;
