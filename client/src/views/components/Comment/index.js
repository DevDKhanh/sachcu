import { useState, useEffect, memo } from 'react';
// import { BsFlagFill } from 'react-icons/bs';

import { convertTime } from '../../../utils/convertTime';
import usersAPI from '../../../api/usersAPI';
import PlaceHolderUser from '../../../assets/images/user-placeholder-image.jpg';
import './style/style.scss';

function Comment({ content, idUser, time }) {
	const [timeComent, setTimeComent] = useState();
	const [user, setUser] = useState({});

	useEffect(() => {
		let timeoutId;
		if (time) {
			const timer = new Date(time);
			timeoutId = setInterval(() => {
				setTimeComent(convertTime(timer));
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
		<div className="comment-item">
			<div className="comment-context">
				<div className="avatar">
					<img
						onError={e => {
							e.target.onerror = null;
							e.target.src = PlaceHolderUser;
						}}
						src={user.avatar}
						alt="avatar"
					/>
				</div>
				<div className="content">
					<div className="content-group">
						<div className="name-user">{`${user.lastName} ${user.firstName}`}</div>
						<div
							dangerouslySetInnerHTML={{ __html: content }}
							className="text-content"
						></div>
					</div>
					<div className="control">
						<span className="btn-reply">Trả lời</span>
						<span className="text">{timeComent}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Comment);
