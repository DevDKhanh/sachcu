import axios from 'axios';
import { getItemStorage } from '../utils/localStorage';
import queryString from 'query-string';

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
		Authorization: `Bearer ${getItemStorage('accessToken')}`,
	},
	baseURL: 'http://localhost:6060/api/v1',
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
