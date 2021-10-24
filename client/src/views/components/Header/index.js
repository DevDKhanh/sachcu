import React from 'react';

import './style/style.scss';

import { ProtectedComponent } from '../../../utils/Protected';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Control from './components/Control';
import MeControl from './components/MeControl';

function Header() {
	return (
		<header>
			<nav className="grid wide">
				<div className="nav">
					<Logo />
					<Navigation />
					<ProtectedComponent dependency={false}>
						<Control />
					</ProtectedComponent>
					<ProtectedComponent dependency={true}>
						<MeControl />
					</ProtectedComponent>
				</div>
			</nav>
		</header>
	);
}

export default Header;
