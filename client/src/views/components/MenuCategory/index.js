import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { baseList } from '../../../constant/listCategory';
import './style/style.scss';

function MenuCategory() {
	return (
		<ul className="menu-category">
			{baseList.map(item => {
				return (
					<li key={item.value} className="menu-item">
						<NavLink
							to={`/category/${item.value}`}
							className="menu-link"
							title={item.text}
						>
							<div className="icon">
								<img src={item.icon} alt="category" />
							</div>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
}

export default memo(MenuCategory);
