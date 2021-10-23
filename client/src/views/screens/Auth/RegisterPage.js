import React from 'react';
// import { NavLink } from 'react-router-dom';

import Input from './components/Input';
import './style/style.scss';

function RegisterPage() {
	return (
		<div className="page-main">
			<section className="main-auth">
				<form className="from-auth form-login" action="">
					<h1 className="title">Đăng ký</h1>
					<Input
						nameInput="email"
						id="email"
						placeholder="Email đăng nhập"
					/>
					<Input
						nameInput="text"
						id="nameUser"
						placeholder="Họ và tên"
					/>
					<Input
						nameInput="text"
						id="numberPhone"
						placeholder="Số điện thoại"
					/>
					<Input
						nameInput="password"
						type="password"
						id="password"
						placeholder="Nhập mật khẩu"
					/>
					<div className="group-form">
						<button className="btn btn--root2 btn-auth">
							Đăng ký
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default RegisterPage;
