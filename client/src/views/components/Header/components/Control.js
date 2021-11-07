import React from 'react';
import { NavLink } from 'react-router-dom';

import Search from '../../Search';

function Control() {
	return (
		<div className="nav-control">
			<Search />
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
