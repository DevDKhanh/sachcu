import React, { memo } from 'react';

import Comment from '../Comment';

function ListComment({ comments }) {
	return (
		<React.Fragment>
			{comments.map(comment => (
				<Comment
					key={comment._id}
					idUser={comment.idUser}
					time={comment.createdAt}
					content={comment.comment}
				/>
			))}
		</React.Fragment>
	);
}

export default memo(ListComment);
