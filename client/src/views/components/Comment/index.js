import { useState, useEffect, memo } from 'react';
// import { BsFlagFill } from 'react-icons/bs';

import LoadingPlaceHolder from '../Effect/LoadingPlaceHolder';
import { convertTime } from '../../../utils/convertTime';
import usersAPI from '../../../api/usersAPI';
import PlaceHolderUser from '../../../assets/images/user-placeholder-image.jpg';
import './style/style.scss';

function Comment({ content, idUser, time }) {
	const [timeComent, setTimeComent] = useState();
	const [user, setUser] = useState({});
	const [loadImg, setLoadImg] = useState(true);

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
						onLoad={() => setLoadImg(false)}
						src={user.avatar}
						alt="avatar"
					/>
					<LoadingPlaceHolder dependency={loadImg} />
				</div>
				<div className="content">
					<div className="content-group">
						<div className="name-user">
							<LoadingPlaceHolder dependency={!user.lastName} />
							{`${user.lastName} ${user.firstName}`}
						</div>
						<div className="text-content">
							{content}
							<LoadingPlaceHolder dependency={!content} />
						</div>
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
