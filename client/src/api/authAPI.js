import axiosClient from '.';

const routeName = '/auth';

const authAPI = {
	register: (data, tokenAxios) => {
		const url = `${routeName}/register`;
		return axiosClient.post(url, { ...data }, { cancelToken: tokenAxios });
	},
	login: (data, tokenAxios) => {
		const url = `${routeName}/login`;
		return axiosClient.post(url, { ...data }, { cancelToken: tokenAxios });
	},
	currentUser: () => {
		const url = `${routeName}/current-user`;
		return axiosClient.get(url);
	},
};

export default authAPI;
