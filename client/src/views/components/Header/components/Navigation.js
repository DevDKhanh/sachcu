import { memo, useMemo } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function Navigation() {
	const { pathname } = useLocation();

	const checkPathname = useMemo(() => {
		const list = ['/dashboard/posts', '/dashboard/users'];
		return list.some(item => item === pathname);
	}, [pathname]);

	const listNav = useMemo(() => {
		const listNavUser = [
			{
				to: '/me/add-post',
				title: 'Đăng tin',
			},
			{
				to: '/me/my-post',
				title: 'Tin của tôi',
			},
		];

		const listDashboard = [
			{
				to: '/dashboard/posts',
				title: 'Quản lí bài đăng',
			},
			{
				to: '/dashboard/users',
				title: 'Quản lí người dùng',
			},
		];
		return checkPathname ? listDashboard : listNavUser;
	}, [checkPathname]);

	return (
		<div className="nav-bar" role="navigation">
			<ul className="navigation">
				{listNav.map(item => (
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

export default memo(Navigation);
