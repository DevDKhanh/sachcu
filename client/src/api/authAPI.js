import axiosClient from '.';

const routeName = '/auth';

const authAPI = {
	register: data => {
		const url = `${routeName}/register`;
		return axiosClient.post(url, { ...data });
	},
	login: data => {
		const url = `${routeName}/login`;
		return axiosClient.post(url, { ...data });
	},
	currentUser: () => {
		const url = `${routeName}/current-user`;
		return axiosClient.get(url);
	},
};

export default authAPI;
