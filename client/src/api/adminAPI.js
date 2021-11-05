import axiosClient from '.';
import { getItemStorage } from '../utils/localStorage';

const routeName = '/admin';

const authAPI = {
	getPostsCensorship: (limit, page, tokenAxios) => {
		const url = `${routeName}/posts/censorship?limit=${limit}&page=${page}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	getPosts: (limit, page, tokenAxios) => {
		const url = `${routeName}/posts?limit=${limit}&page=${page}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	updateActivePost: (data, tokenAxios) => {
		const url = `${routeName}/posts/post/active`;
		return axiosClient.put(url, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	deletePost: (id, tokenAxios) => {
		const url = `${routeName}/posts/post?id=${id}`;
		return axiosClient.delete(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	accpetPost: (data, tokenAxios) => {
		const url = `${routeName}/posts/post/accpet`;
		return axiosClient.put(url, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
};

export default authAPI;
