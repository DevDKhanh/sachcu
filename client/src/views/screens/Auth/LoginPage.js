import React from 'react';
import { NavLink } from 'react-router-dom';

import Input from './components/Input';
import './style/style.scss';

function LoginPage() {
	return (
		<div className="page-main">
			<section className="main-auth">
				<form className="from-auth form-login" action="">
					<h1 className="title">Đăng nhập</h1>
					<Input
						nameInput="email"
						id="email"
						placeholder="Email đăng nhập"
					/>
					<Input
						nameInput="password"
						type="password"
						id="password"
						placeholder="Nhập mật khẩu"
					/>
					<div className="group-link">
						<NavLink to="/register">Bạn chưa có tài khoản?</NavLink>
						<a href="/#" id="forgot-pass">
							Quên mật khẩu
						</a>
					</div>
					<div className="group-form">
						<button className="btn btn--root2 btn-auth">
							Đăng nhập
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default LoginPage;
