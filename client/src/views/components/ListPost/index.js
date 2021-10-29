import React, { useEffect, useState, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ProtectedComponent } from '../../../utils/Protected';
import postAPI from '../../../api/postAPI';
import CardPost from '../CardPost';
import './style/style.scss';

function ListPost({
	title = 'Danh sách bài đăng',
	category = 'all',
	litmit = 8,
	seemore = true,
}) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await postAPI.getPosts(category, litmit);
			if (res.data) {
				setPosts(res.data);
			}
		})();

		return () => setPosts([]);
	}, [category, litmit]);

	return (
		<ProtectedComponent dependency={posts.length > 0}>
			<div className="list-posts">
				<div className="list-posts-header">
					<div className="title">{title}</div>
					{seemore && (
						<NavLink to={`/category/${category}`}>Xem thêm</NavLink>
					)}
				</div>
				<div className="list-posts-show">
					{posts.map(post => (
						<CardPost key={post._id} data={post} />
					))}
				</div>
			</div>
		</ProtectedComponent>
	);
}

export default memo(ListPost);
