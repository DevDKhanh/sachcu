import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { baseList } from '../../../constant/listCategory';
import './style/style.scss';

function Footer() {
	return (
		<footer>
			<div className="grid wide">
				<div className="row">
					<div className="col l-3">
						<p>
							Website hoạt động cốt lõi là trao đổi sách nhằm lan
							tỏa văn hóa đọc sách trong cộng đồng
						</p>
					</div>
					<div className="col l-3">
						<h4 className="title">Thể Loại</h4>
						<div className="row">
							<ul className="col l-6">
								{baseList.map((item, index) => {
									if (index < baseList.length / 2) {
										return (
											<li
												key={item.value}
												className="menu-item"
											>
												<NavLink
													to={`/category/${item.value}`}
													className="menu-link"
												>
													- {item.text}
												</NavLink>
											</li>
										);
									}
									return null;
								})}
							</ul>
							<ul className="col l-6">
								{baseList.map((item, index) => {
									if (index >= baseList.length / 2) {
										return (
											<li
												key={item.value}
												className="menu-item"
											>
												<NavLink
													to={`/category/${item.value}`}
													className="menu-link"
												>
													- {item.text}
												</NavLink>
											</li>
										);
									}
									return null;
								})}
							</ul>
						</div>
					</div>
					<div className="col l-3">
						<h4 className="title">Liên Hệ</h4>
						<p>buidongtung@gmail.com</p>
						<p>0327 265 569</p>
						<p>526, Minh Khai, Vĩnh Tuy, Hai bà Trưng, Hà Nội</p>
					</div>
					<div className="col l-3">
						<h4 className="title">Email</h4>
						<input type="email" name="email" placeholder="Email" />
					</div>
				</div>
			</div>
		</footer>
	);
}

export default memo(Footer);
