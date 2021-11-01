import axiosClient from '.';

const routeName = '/users';

const usersAPI = {
	getContact: (idUser, tokenAxios) => {
		const url = `${routeName}/user/contact?idUser=${idUser}`;
		return axiosClient.get(url, { cancelToken: tokenAxios });
	},
};

export default usersAPI;
