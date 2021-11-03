import { combineReducers } from 'redux';

import userReducer from './userReducer';
import siteReducer from './siteReducer';

const reducers = combineReducers({
	user: userReducer,
	site: siteReducer,
});

export default reducers;
