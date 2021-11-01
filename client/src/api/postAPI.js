import axiosClient from '.';

const routeName = '/posts';

const meAPI = {
	getPost: (slug, tokenAxios) => {
		const url = `${routeName}/post?slug=${slug}`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
	},
	getPosts: (category, limit = 8, page = 1, tokenAxios) => {
		const url = `${routeName}?category=${category}&limit=${limit}&page=${page}`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
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
