import React, {
	useCallback,
	useState,
	useContext,
	useEffect,
	memo,
} from 'react';

import { useCancelToken } from '../../../../hooks';
import commentsAPI from '../../../../api/commentsAPI';
import { SocketContext } from '../../../../context/socket';
import { ProtectedComponent } from '../../../../utils/Protected';
import Comment from '..';

function CommentReply({ slug, id, showReply, onSetShowReply }) {
	const socket = useContext(SocketContext);
	const [countComment, setCountComment] = useState(0);
	const [commentReply, setCommentReply] = useState([]);
	const { newCancelToken } = useCancelToken();

	//=====< handle join and leave room chat reply >=====
	const handleShowReply = useCallback(() => {
		if (!showReply) {
			onSetShowReply(true);
		} else {
			onSetShowReply(false);
		}
	}, [showReply, onSetShowReply]);

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
				setCommentReply([...res.data]);
			}
		})();
	}, [slug, socket, id, setCommentReply, setCountComment, newCancelToken]);

	useEffect(() => {
		//=====< update state comment reply if create comment >=====
		socket.on(
			'commentReply:successCreate',
			({ data, idComment, count }) => {
				if (idComment === id) {
					setCommentReply(prev => [data, ...prev]);
					setCountComment(count);
				}
			},
		);

		socket.on('commentReply:deleteSuccess', id => {
			setCountComment(prev => prev - 1);
			setCommentReply(prev => {
				return prev.filter(comment => comment._id !== id);
			});
		});

		socket.on('commentReply:editSuccess', data => {
			setCommentReply(prev =>
				prev.map(comment => {
					if (comment._id === data._id) {
						return data;
					} else {
						return comment;
					}
				}),
			);
		});

		return () => {
			socket.off('commentReply:deleteSuccess');
			socket.off('commentReply:successCreate');
			socket.off('commentReply:editSuccess');
		};
	});

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
				{commentReply.map(comment => (
					<Comment
						onSetCommentReply={setCommentReply}
						key={comment._id}
						id={comment._id}
						slug={slug}
						onSetCountCommentReply={setCountComment}
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
