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
	verifyUser: query => {
		const url = `${routeName}/verifyMail${query}`;
		return axiosClient.get(url);
	},
	sendMail: data => {
		const url = `${routeName}/sendMail`;
		return axiosClient.post(url, data);
	},
};

export default authAPI;
