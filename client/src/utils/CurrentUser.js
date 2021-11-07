import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as typeSite from '../actions/typeSite';
import * as typeUser from '../actions/typeUser';

import authAPI from '../api/authAPI';

export default function CurrentUser({ children }) {
	const dispatch = useDispatch();
	const { isLoading } = useSelector(state => state.site);

	useEffect(() => {
		const unLock = () => {
			dispatch({ type: typeSite.SITE_UNLOCK_LOAD });
			console.clear();
		};
		const setLogin = res => {
			dispatch({ type: typeUser.USER_CURRENT, payload: res.user });
		};
		authAPI
			.currentUser()
			.then(res => {
				if (res.user) {
					setLogin(res);
					unLock();
				} else {
					unLock();
				}
			})
			.catch(err => {
				unLock();
			});
	}, [dispatch]);

	return <React.Fragment>{isLoading && children}</React.Fragment>;
}
