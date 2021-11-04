import axiosClient from '.';

const routeName = '/admin';

const authAPI = {
	getPosts: tokenAxios => {
		const url = `${routeName}/posts`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
	},
	updateActivePost: (data, tokenAxios) => {
		const url = `${routeName}/posts/post/active`;
		return axiosClient.put(url, { ...data }, { cancelToken: tokenAxios });
	},
	deletePost: (id, tokenAxios) => {
		const url = `${routeName}/posts/post?id=${id}`;
		return axiosClient.delete(url, { cancelToken: tokenAxios });
	},
};

export default authAPI;
