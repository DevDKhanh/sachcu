import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import * as typeUser from '../../../actions/typeUser';
import authAPI from '../../../api/authAPI';

function VerifyMail() {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				if (location.search) {
					const res = await authAPI.verifyUser(location.search);
					if (res.status === 1) {
						/********** update state user login then create user successfully **********/
						dispatch({
							type: typeUser.USER_REGISTER,
							payload: {
								...res.data,
								accessToken: res.accessToken,
							},
						});
					} else {
						history.push('/');
					}
				}
			} catch (err) {
				history.push('/');
			}
		})();
		return () => console.clear();
	}, [location.search, dispatch, history]);

	return (
		<div className="page-main">
			<div className="grid wide"></div>
		</div>
	);
}

export default VerifyMail;
