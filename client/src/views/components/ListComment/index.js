import React, { memo } from 'react';

import { ProtectedComponent } from '../../../utils/Protected';
import Comment from '../Comment';
import './style/style.scss';

function ListComment({ comments }) {
	return (
		<React.Fragment>
			<div className="list-comments">
				<ProtectedComponent dependency={comments.length > 0}>
					{comments.map(comment => (
						<div key={comment._id} className="comment-item-group">
							<Comment
								idUser={comment.idUser}
								time={comment.createdAt}
								content={comment.comment}
								slug={comment.slug}
								id={comment._id}
							/>
						</div>
					))}
				</ProtectedComponent>
				<ProtectedComponent dependency={comments.length <= 0}>
					<span className="msg-text">Chưa có bình luận nào</span>
				</ProtectedComponent>
			</div>
		</React.Fragment>
	);
}

export default memo(ListComment);
