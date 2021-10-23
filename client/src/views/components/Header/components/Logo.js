import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
	return (
		<div className="nav-logo">
			<NavLink to="/" exact>
				<h3 className="text">SACHCU.VN</h3>
			</NavLink>
		</div>
	);
}

export default Logo;
