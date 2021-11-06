import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaRegTimesCircle } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import { IoNewspaper } from 'react-icons/io5';
import { RiChatFollowUpLine } from 'react-icons/ri';
import { AiOutlineLogout, AiFillDashboard } from 'react-icons/ai';
import { toast } from 'react-toastify';

import * as typeUser from '../../../actions/typeUser';
import AvatarImg from '../AvatarImg';
import { ProtectedComponent } from '../../../utils/Protected';
import './style/style.scss';

function TabMenu({ isShow, onShow, user }) {
	const dispatch = useDispatch();
	const { infoUser } = useSelector(state => state.user);

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
						<FaRegTimesCircle />
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
						<ProtectedComponent dependency={infoUser.isAdmin}>
							<li className="menu-item">
								<NavLink
									className="menu-link"
									to="/dashboard/posts"
									onClick={() => onShow(false)}
								>
									<span className="icon">
										<AiFillDashboard />
									</span>
									<p>Trang quản trị</p>
								</NavLink>
							</li>
						</ProtectedComponent>
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
								to="/me/notify-comment"
								onClick={() => onShow(false)}
							>
								<span className="icon">
									<RiChatFollowUpLine />
								</span>
								<p>Theo dõi bình luận</p>
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
