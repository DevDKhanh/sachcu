import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
	const list = [
		{
			to: '/',
			title: 'Thể loại',
		},
		{
			to: '/',
			title: 'Mới nhất',
		},
	];

	return (
		<div className="nav-bar" role="navigation">
			<ul className="navigation">
				{list.map(item => (
					<li key={item.title} className="item">
						<NavLink to={item.to} className="link">
							{item.title}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Navigation;
