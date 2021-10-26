import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

import * as typeUser from '../../../actions/typeUser';
import authAPI from '../../../api/authAPI';
import Input from './components/Input';
import './style/style.scss';

function RegisterPage() {
	const dispatch = useDispatch();
	const [dataForm, setDataForm] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = e => {
		const key = e.target.name;
		const value = e.target.value;
		setDataForm(prev => ({ ...prev, [key]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		const sumit = async () => {
			try {
				const res = await authAPI.register(dataForm);
				setLoading(false);
				if (res.status === 1) {
					dispatch({
						type: typeUser.USER_REGISTER,
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
		sumit();
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
						<h1 className="title">Đăng ký</h1>
						<Input
							nameInput="email"
							id="email"
							placeholder="Email đăng nhập"
							onChange={handleChange}
						/>
						<Input
							nameInput="lastName"
							id="lastName"
							placeholder="Họ"
							onChange={handleChange}
						/>
						<Input
							nameInput="firstName"
							id="firstName"
							placeholder="Tên"
							onChange={handleChange}
						/>
						<Input
							nameInput="phone"
							id="numberPhone"
							placeholder="Số điện thoại"
							onChange={handleChange}
						/>
						<Input
							nameInput="passWord"
							type="password"
							id="password"
							placeholder="Nhập mật khẩu"
							onChange={handleChange}
						/>
						<div className="group-form">
							<button className="btn btn--root2 btn-auth">
								Đăng ký
							</button>
						</div>
					</form>
				</section>
			</div>
		</LoadingOverlay>
	);
}

export default RegisterPage;
