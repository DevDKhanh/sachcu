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
		return axiosClient.put(url, data, { cancelToken: tokenAxios });
	},
	deletePost: (id, tokenAxios) => {
		const url = `${routeName}/post?id=${id}`;
		return axiosClient.delete(url, { cancelToken: tokenAxios });
	},
};

export default meAPI;
