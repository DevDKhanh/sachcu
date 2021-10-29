import axiosClient from '.';

const routeName = '/posts';

const meAPI = {
	getPost: slug => {
		const url = `${routeName}/post?slug=${slug}`;
		return axiosClient.get(url);
	},
	getPosts: (category, limit = 8) => {
		const url = `${routeName}?category=${category}&limit=${limit}`;
		return axiosClient.get(url);
	},
	postReviews: data => {
		const url = `${routeName}/reviews`;
		return axiosClient.post(url, data);
	},
	getReviews: slug => {
		const url = `${routeName}/reviews?slug=${slug}`;
		return axiosClient.get(url);
	},
};

export default meAPI;
