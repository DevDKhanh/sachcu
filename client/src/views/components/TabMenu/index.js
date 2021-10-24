import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import { BsFilePost } from 'react-icons/bs';
import { IoNewspaper } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiProfileLine } from 'react-icons/ri';

import { ProtectedComponent } from '../../../utils/Protected';
import PlaceHolderUser from '../../../assets/images/user-placeholder-image.jpg';
import './style/style.scss';

function TabMenu({ isShow, onClose }) {
	return (
		<React.Fragment>
			<ProtectedComponent dependency={isShow}>
				<div className="overlay" onClick={() => onClose(false)}></div>
			</ProtectedComponent>
			<div className={`table-menu ${!isShow && 'closed'}`}>
				<div className="table-menu__header">
					<span className="btn-close" onClick={() => onClose(false)}>
						<MdDoubleArrow />
					</span>
					<div className="info-user">
						<div className="avatar">
							<img
								onError={e => {
									e.target.onerror = null;
									e.target.src = PlaceHolderUser;
								}}
								src=""
								alt="duy khanh"
							/>
						</div>
						<div className="actions">
							<h4 className="text-name">Duy Khánh</h4>
							<button className="btn btn--o-primary">
								Đăng tin
							</button>
						</div>
					</div>
					<ul className="menu">
						<li className="menu-item">
							<NavLink className="menu-link" to="/">
								<span className="icon">
									<BsFilePost />
								</span>
								<p>Bài viết của tôi</p>
							</NavLink>
						</li>
						<li className="menu-item">
							<NavLink className="menu-link" to="/">
								<span className="icon">
									<IoNewspaper />
								</span>
								<p>Bài viết mới</p>
							</NavLink>
						</li>
						<li className="menu-item">
							<NavLink className="menu-link" to="/">
								<span className="icon">
									<RiProfileLine />
								</span>
								<p>Tất cả bài viết</p>
							</NavLink>
						</li>
						<li className="menu-item">
							<NavLink className="menu-link" to="/">
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

export default TabMenu;
