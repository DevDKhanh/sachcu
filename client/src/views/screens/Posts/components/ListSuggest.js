import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ProtectedComponent } from '../../../../utils/Protected';
import CardInfo from '../../../components/CardPost/components/CardInfo';

function ListSuggest({ posts = null, category, title }) {
	return (
		<div className="list-tag">
			<h3 className="list-tag__title">{title}</h3>
			<ProtectedComponent dependency={posts.length > 0}>
				<div className="list">
					{posts.map(post => (
						<CardInfo key={post._id} data={post} />
					))}
				</div>
				<div className="list-group-btn">
					<NavLink
						to={`/category/${category}`}
						className="btn btn-seemore"
					>
						Xem thêm
					</NavLink>
				</div>
			</ProtectedComponent>
			<ProtectedComponent dependency={posts.length <= 0}>
				<h4 className="msg">Không có bài viết phù hợp</h4>
			</ProtectedComponent>
		</div>
	);
}

export default memo(ListSuggest);
