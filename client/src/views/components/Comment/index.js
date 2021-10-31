import { useState, useEffect, memo } from 'react';
// import { BsFlagFill } from 'react-icons/bs';

import AvatarImg from '../AvatarImg';
import { ProtectedComponent } from '../../../utils/Protected';
import CommentReply from './components/CommentReply';
import CommentControl from './components/CommentControl';
import CommentText from './components/CommentText';
import { convertTime } from '../../../utils/convertTime';
import usersAPI from '../../../api/usersAPI';
import './style/style.scss';

function Comment({ content, idUser, time, isReply = false, slug, id }) {
	const [timeComment, setTimeComment] = useState();
	const [commentsReply, setCommentsReply] = useState([]);
	const [showReply, setShowReply] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		let timeoutId;
		if (time) {
			const timer = new Date(time);
			timeoutId = setInterval(() => {
				setTimeComment(convertTime(timer));
			}, 100);
		}
		return () => clearTimeout(timeoutId);
	}, [time]);

	useEffect(() => {
		if (idUser) {
			(async () => {
				try {
					const res = await usersAPI.getContact(idUser);
					if (res.status === 1) {
						setUser(res.data);
					}
				} catch (err) {}
			})();
		}

		return () => setUser({});
	}, [idUser]);

	return (
		<div className={`comment-item ${isReply && 'comment--reply'}`}>
			<div className="comment-context">
				<AvatarImg avatar={user.avatar} className="comment-avatar" />
				<div className="content">
					<CommentText
						lastName={user.lastName}
						firstName={user.firstName}
						content={content}
					/>
					<CommentControl
						isReply={isReply}
						id={id}
						slug={slug}
						onSetShowReply={setShowReply}
						onSetCommentsReply={setCommentsReply}
						timeComment={timeComment}
					/>
					<ProtectedComponent dependency={!isReply}>
						<CommentReply
							comments={commentsReply}
							showReply={showReply}
							onSetShowReply={setShowReply}
							onSetCommentsReply={setCommentsReply}
							id={id}
						/>
					</ProtectedComponent>
				</div>
			</div>
		</div>
	);
}

export default memo(Comment);
