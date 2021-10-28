import axiosClient from '.';

const routeName = '/posts';

const meAPI = {
	getPost: slug => {
		const url = `${routeName}/post?slug=${slug}`;
		return axiosClient.get(url);
	},
};

export default meAPI;
