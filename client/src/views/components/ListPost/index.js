import React from 'react';

import CardPost from '../CardPost';
import './style/style.scss';

function ListPost({ title = 'Danh sách bài đăng', list = [] }) {
	return (
		<div className="list-posts">
			<div className="list-posts-header">
				<div className="title">{title}</div>
			</div>
			<div className="list-posts-show">
				{list.map(item => (
					<CardPost key={item._id} data={item} />
				))}
			</div>
		</div>
	);
}

export default ListPost;
