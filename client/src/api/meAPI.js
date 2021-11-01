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
};

export default meAPI;
