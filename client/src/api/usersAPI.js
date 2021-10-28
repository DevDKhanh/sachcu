import axiosClient from '.';

const routeName = '/users';

const usersAPI = {
	getContact: email => {
		const url = `${routeName}/user/contact?email=${email}`;
		return axiosClient.get(url);
	},
};

export default usersAPI;
