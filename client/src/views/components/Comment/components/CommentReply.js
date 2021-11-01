import React, { useState, useContext, useEffect, memo } from 'react';

import { useCancelToken } from '../../../../hooks';
import commentsAPI from '../../../../api/commentsAPI';
import { SocketContext } from '../../../../context/socket';
import { ProtectedComponent } from '../../../../utils/Protected';
import Comment from '..';

function CommentReply({
	slug,
	id,
	comments,
	showReply,
	onSetShowReply,
	onSetCommentsReply,
}) {
	const socket = useContext(SocketContext);
	const [countComment, setCountComment] = useState(0);
	const { newCancelToken } = useCancelToken();

	//=====< handle join and leave room chat reply >=====
	const handleShowReply = () => {
		if (!showReply) {
			onSetShowReply(true);
		} else {
			onSetShowReply(false);
		}
	};

	useEffect(() => {
		//=====< Get data comment reply >=====
		(async () => {
			const res = await commentsAPI.getCommentOfPage(
				id,
				50,
				true,
				1,
				newCancelToken(),
			);
			if (res && res.data) {
				setCountComment(res.countComments);
				onSetCommentsReply([...res.data]);
			}
		})();
	}, [slug, socket, id, onSetCommentsReply, setCountComment, newCancelToken]);

	useEffect(() => {
		//=====< update state comment reply if create comment >=====
		socket.on(
			'commentReply:successCreate',
			({ data, idComment, count }) => {
				if (idComment === id) {
					onSetCommentsReply(prev => [data, ...prev]);
					setCountComment(count);
				}
			},
		);

		return () => socket.off('commentReply:successCreate');
	}, [id, onSetCommentsReply, socket]);

	return (
		<React.Fragment>
			<ProtectedComponent dependency={countComment > 0}>
				<button className="btn-see-reply" onClick={handleShowReply}>
					{showReply
						? 'Ẩn câu trả lời'
						: `Xem ${countComment} câu trả lời`}
				</button>
			</ProtectedComponent>
			<ProtectedComponent dependency={showReply}>
				{comments.map(comment => (
					<Comment
						key={comment._id}
						content={comment.comment}
						idUser={comment.idUser}
						time={comment.createdAt}
						isReply={true}
					/>
				))}
			</ProtectedComponent>
		</React.Fragment>
	);
}

export default memo(CommentReply);
