import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import { BsFilePost } from 'react-icons/bs';
import { IoNewspaper } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
import { toast } from 'react-toastify';

import * as typeUser from '../../../actions/typeUser';
import AvatarImg from '../AvatarImg';
import { ProtectedComponent } from '../../../utils/Protected';
import './style/style.scss';

function TabMenu({ isShow, onShow, user }) {
	const dispatch = useDispatch();

	/********** Logout user **********/
	const handleLogout = () => {
		dispatch({ type: typeUser.USER_LOGOUT });
		toast.info('Đăng xuất thành công!');
	};

	return (
		<React.Fragment>
			<ProtectedComponent dependency={isShow}>
				<div className="overlay" onClick={() => onShow(false)}></div>
			</ProtectedComponent>
			<div role="menubar" className={`table-menu ${!isShow && 'closed'}`}>
				<div className="table-menu__header">
					<span className="btn-close" onClick={() => onShow(false)}>
						<MdDoubleArrow />
					</span>
					<div className="info-user">
						<AvatarImg avatar={user.avatar} />
						<div className="actions">
							<h4 className="text-name">{`${user.firstName} ${user.lastName}`}</h4>
							<NavLink
								to="/me/add-post"
								role="button"
								className="btn btn--o-primary"
								onClick={() => onShow(false)}
							>
								Đăng tin
							</NavLink>
						</div>
					</div>
					<ul className="menu">
						<li className="menu-item">
							<NavLink
								className="menu-link"
								to="/me/my-post"
								onClick={() => onShow(false)}
							>
								<span className="icon">
									<BsFilePost />
								</span>
								<p>Bài viết của tôi</p>
							</NavLink>
						</li>
						<li className="menu-item">
							<NavLink
								className="menu-link"
								to="/category/all"
								onClick={() => onShow(false)}
							>
								<span className="icon">
									<IoNewspaper />
								</span>
								<p>Bài viết mới</p>
							</NavLink>
						</li>
						<li className="menu-item">
							<NavLink
								className="menu-link"
								to="/"
								onClick={handleLogout}
							>
								<span className="icon">
									<AiOutlineLogout />
								</span>
								<p>Đăng xuất</p>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
}

export default memo(TabMenu);
