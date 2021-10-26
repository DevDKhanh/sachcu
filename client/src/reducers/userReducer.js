import * as typeUser from '../actions/typeUser';
import { setItemStorage, deleteItemStorage } from '../utils/localStorage';

const initialState = {
	isLogged: false,
	infoUser: {},
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case typeUser.USER_LOGIN:
			const tokenLogin = payload.accessToken;
			setItemStorage('accessToken', tokenLogin);
			return { ...state, isLogged: true, infoUser: { ...payload } };
		case typeUser.USER_REGISTER:
			const tokenSignup = payload.accessToken;
			setItemStorage('accessToken', tokenSignup);
			return { ...state, isLogged: true, infoUser: { ...payload } };
		case typeUser.USER_LOGOUT:
			deleteItemStorage('accessToken');
			return { ...state, isLogged: false, infoUser: {} };
		case typeUser.USER_CURRENT:
			return { ...state, isLogged: true, infoUser: { ...payload } };
		default:
			return state;
	}
};

export default userReducer;
