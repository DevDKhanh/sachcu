import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import * as typeUser from '../../../actions/typeUser';
import useAPI from '../../../api/authAPI';
import Input from './components/Input';
import './style/style.scss';

function LoginPage() {
	const dispatch = useDispatch();
	const [dataForm, setDataForm] = useState({});
	const [loading, setLoading] = useState(false);

	/********** update state date form **********/
	const handleChange = e => {
		const key = e.target.name;
		const value = e.target.value;
		setDataForm(prev => ({ ...prev, [key]: value }));
	};

	/********** submit form login **********/
	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		const submit = async () => {
			try {
				const res = await useAPI.login(dataForm);
				setLoading(false);
				if (res.status === 1) {
					/********** update state user login **********/
					dispatch({
						type: typeUser.USER_LOGIN,
						payload: {
							...res.data,
							accessToken: res.accessToken,
						},
					});
					toast.success(res.message_vn, { autoClose: 3000 });
				} else {
					toast.error(res.message_vn, { autoClose: 3000 });
				}
			} catch (err) {
				setLoading(false);
				toast.error('Server đang quá tải thử lại sau ít phút');
			}
		};
		submit();
	};

	return (
		<LoadingOverlay active={loading} spinner text="Đang xử lí...">
			<div className="page-main">
				<section className="main-auth">
					<form
						onSubmit={handleSubmit}
						className="from-auth form-login"
						action=""
					>
						<h1 className="title">Đăng nhập</h1>
						<Input
							nameInput="email"
							id="email"
							placeholder="Email đăng nhập"
							onChange={handleChange}
						/>
						<Input
							nameInput="passWord"
							type="password"
							id="password"
							placeholder="Nhập mật khẩu"
							onChange={handleChange}
						/>
						<div className="group-link">
							<NavLink to="/register">
								Bạn chưa có tài khoản?
							</NavLink>
							<NavLink to="/auth/forgotpass" id="forgot-pass">
								Quên mật khẩu
							</NavLink>
						</div>
						<div className="group-form">
							<button className="btn btn--root2 btn-auth">
								Đăng nhập
							</button>
						</div>
					</form>
				</section>
			</div>
		</LoadingOverlay>
	);
}

export default LoginPage;
