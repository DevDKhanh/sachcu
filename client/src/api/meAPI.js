import axiosClient from '.';

const routeName = '/me';

const meAPI = {
	addPost: data => {
		const url = `${routeName}/post`;
		return axiosClient.post(url, data);
	},
};

export default meAPI;
