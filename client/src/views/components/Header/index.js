import React from 'react';
import { useSelector } from 'react-redux';

import './style/style.scss';

import { ProtectedComponent } from '../../../utils/Protected';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Control from './components/Control';
import MeControl from './components/MeControl';

function Header() {
	const { isLogged, infoUser } = useSelector(state => state.user);
	return (
		<header>
			<nav className="grid wide">
				<div className="nav">
					<Logo />
					<Navigation />
					<ProtectedComponent dependency={!isLogged}>
						<Control />
					</ProtectedComponent>
					<ProtectedComponent dependency={isLogged}>
						<MeControl user={infoUser} />
					</ProtectedComponent>
				</div>
			</nav>
		</header>
	);
}

export default Header;
