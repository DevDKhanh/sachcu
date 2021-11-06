import { memo, useContext } from 'react';
import { MdCircleNotifications } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { SocketContext } from '../../../context/socket';

import './style/style.scss';

function CardNotify({ message }) {
	const socket = useContext(SocketContext);

	const handleRead = () => {
		socket.emit('message:read', { type: message.type, id: message._id });
	};

	return (
		<NavLink
			to={
				message.style === 'accpet'
					? `/post/${message.slug}`
					: `/me/message/not-accpet/${message._id}`
			}
			onClick={handleRead}
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
