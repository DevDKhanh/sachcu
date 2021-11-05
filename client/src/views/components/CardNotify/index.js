import { memo } from 'react';
import { MdCircleNotifications } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import './style/style.scss';

function CardNotify({ message }) {
	return (
		<NavLink
			to={`/post/${message.slug}`}
			className={`card-notify ${message.style}`}
		>
			<span className="icon">
				<MdCircleNotifications />
				{message.read === 0 && <span className="dot"></span>}
			</span>
			<span className="text">
				<p>{message.message}</p>
				<span className="timer">
					{new Date(message.createdAt).toLocaleDateString('en-GB')}
				</span>
			</span>
		</NavLink>
	);
}

export default memo(CardNotify);
