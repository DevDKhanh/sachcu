import { memo, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';

import { SocketContext } from '../../../../context/socket';
import { convertTime } from '../../../../utils/convertTime';
import '../style/cardMessage.scss';

function CardMessage({ message }) {
	const socket = useContext(SocketContext);
	const [timePost, setTimePost] = useState();

	/********** time create Message **********/
	useEffect(() => {
		let timeoutId;
		if (message.createdAt) {
			const timer = new Date(message.createdAt);
			timeoutId = setInterval(() => {
				setTimePost(convertTime(timer));
			}, 100);
		}
		return () => clearTimeout(timeoutId);
	}, [message.createdAt]);

	const handleRead = () => {
		socket.emit('message:read', { type: message.type, id: message._id });
	};

	return (
		<NavLink
			to={`/post/${message.slug}`}
			onClick={handleRead}
			className="card-message"
		>
			{message.read === 0 && <span className="dot"></span>}
			<span className="icon">
				<RiMessage3Fill />
			</span>
			<div className="content">
				<h4 className="title">{message.message}</h4>
				<p className="text">{message.content}</p>
				<span className="timer">{timePost}</span>
			</div>
		</NavLink>
	);
}

export default memo(CardMessage);
