import axiosClient from '.';

const routeName = '/users';

const usersAPI = {
	getContact: idUser => {
		const url = `${routeName}/user/contact?idUser=${idUser}`;
		return axiosClient.get(url);
	},
};

export default usersAPI;
