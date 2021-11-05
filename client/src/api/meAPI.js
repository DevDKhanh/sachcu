import axiosClient from '.';
import { getItemStorage } from '../utils/localStorage';

const routeName = '/me';

const meAPI = {
	addPost: (data, tokenAxios) => {
		const url = `${routeName}/post`;
		return axiosClient.post(url, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	updateStatus: (data, tokenAxios) => {
		const url = `${routeName}/status`;
		return axiosClient.put(url, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	deletePost: (id, tokenAxios) => {
		const url = `${routeName}/post?id=${id}`;
		return axiosClient.delete(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	getMessage: ({ limit = 4, page = 1, type = 'post' }, tokenAxios) => {
		const url = `${routeName}/message?type=${type}&limit=${limit}&page=${page}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
};

export default meAPI;
