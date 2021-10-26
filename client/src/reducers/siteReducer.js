import * as typeSite from '../actions/typeSite';

const initialState = {
	isLoading: false,
};

const siteReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case typeSite.SITE_UNLOCK_LOAD:
			return { ...state, isLoading: true };
		default:
			return state;
	}
};

export default siteReducer;
