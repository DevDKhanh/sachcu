import React from 'react';

import './style/style.scss';

import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Control from './components/Control';

function Header() {
	return (
		<header>
			<nav className="grid wide">
				<div className="nav">
					<Logo />
					<Navigation />
					<Control />
				</div>
			</nav>
		</header>
	);
}

export default Header;
