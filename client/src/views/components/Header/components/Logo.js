import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
	return (
		<div className="nav-logo">
			<NavLink to="/" exact>
				<h3 className="text">TRAODOISACH</h3>
			</NavLink>
		</div>
	);
}

export default Logo;
