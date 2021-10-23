import React from 'react';
import { NavLink } from 'react-router-dom';

function Control() {
	return (
		<div className="nav-control">
			<NavLink to="/login" className="btn link-login">
				Đăng nhập
			</NavLink>
			<NavLink to="/register" className="btn link-register">
				Đăng ký
			</NavLink>
		</div>
	);
}

export default Control;
