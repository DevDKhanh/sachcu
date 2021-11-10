import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { baseList } from '../../../constant/listCategory';
import './style/style.scss';

function MenuCategory() {
	return (
		<ul className="menu-category">
			<h3>Thể loại</h3>
			{baseList.map(item => {
				return (
					<li key={item.value} className="menu-item">
						<NavLink
							to={`/category/${item.value}`}
							className="menu-link"
							title={item.text}
						>
							{item.text}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
}

export default memo(MenuCategory);
