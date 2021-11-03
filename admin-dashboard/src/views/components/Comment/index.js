import { useState, useEffect, memo } from 'react';
// import { BsFlagFill } from 'react-icons/bs';

import AvatarImg from '../AvatarImg';
import { useCancelToken } from '../../../hooks';
import { ProtectedComponent } from '../../../utils/Protected';
import { convertTime } from '../../../utils/convertTime';
import CommentReply from './components/CommentReply';
import CommentControl from './components/CommentControl';
import CommentText from './components/CommentText';
import usersAPI from '../../../api/usersAPI';
import './style/style.scss';

function Comment(props) {
	const [timeComment, setTimeComment] = useState();
	const [showReply, setShowReply] = useState(false);
	const [user, setUser] = useState({});
	const { newCancelToken } = useCancelToken();

	/********** time create post **********/
	useEffect(() => {
		let timeoutId;
		if (props.time) {
			const timer = new Date(props.time);
			timeoutId = setInterval(() => {
				setTimeComment(convertTime(timer));
			}, 100);
		}
		return () => clearTimeout(timeoutId);
	}, [props]);

	/********** get user info from id **********/
	useEffect(() => {
		if (props.idUser) {
			(async () => {
				try {
					const res = await usersAPI.getContact(
						props.idUser,
						newCancelToken(),
					);
					if (res.status === 1) {
						setUser(res.data);
					}
				} catch (err) {}
			})();
		}

		return () => setUser({});
	}, [props, newCancelToken]);

	return (
		<div className={`comment-item ${props.isReply && 'comment--reply'}`}>
			<div className="comment-context">
				<AvatarImg avatar={user.avatar} className="comment-avatar" />
				<div className="content">
					<CommentText
						lastName={user.lastName}
						firstName={user.firstName}
						content={props.content}
					/>
					<CommentControl
						timeComment={timeComment}
						id={props.id}
						idUser={props.idUser}
						isReply={props.isReply}
						slug={props.slug}
						onSetShowReply={setShowReply}
						content={props.content}
					/>
					<ProtectedComponent dependency={!props.isReply}>
						<CommentReply
							showReply={showReply}
							slug={props.slug}
							onSetShowReply={setShowReply}
							id={props.id}
						/>
					</ProtectedComponent>
				</div>
			</div>
		</div>
	);
}

export default memo(Comment);
