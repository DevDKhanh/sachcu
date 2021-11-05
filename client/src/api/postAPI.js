import axiosClient from '.';

import { getItemStorage } from '../utils/localStorage';
const routeName = '/posts';

const meAPI = {
	countPosts: tokenAxios => {
		const url = `${routeName}/count`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
	},
	getPost: (slug, tokenAxios) => {
		const url = `${routeName}/post?slug=${slug}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	getPosts: (category, limit = 8, page = 1, myPage = false, tokenAxios) => {
		const url = `${routeName}?category=${category}&limit=${limit}&page=${page}&myPage=${myPage}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
	postReviews: (data, tokenAxios) => {
		const url = `${routeName}/reviews`;
		return axiosClient.post(url, data, { cancelToken: tokenAxios });
	},
	getReviews: (slug, tokenAxios) => {
		const url = `${routeName}/reviews?slug=${slug}`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
	},
};

export default meAPI;
