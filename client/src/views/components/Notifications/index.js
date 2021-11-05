import { memo, useState, useContext, useEffect } from 'react';

import { SocketContext } from '../../../context/socket';
import CardNotify from '../CardNotify';
import meAPI from '../../../api/meAPI';
import './style/style.scss';

function Notifications() {
	const limit = 4;
	const socket = useContext(SocketContext);
	const [listMessage, setListMessage] = useState([]);
	const [page] = useState(1);

	useEffect(() => {
		socket.on('message:send', ({ data }) => {
			setListMessage(prev => [data, ...prev]);
		});
		return () => socket.off('message:send');
	}, [socket]);

	useEffect(() => {
		(async () => {
			const res = await meAPI.getMessage({ limit: limit, page });
			console.log(res);
			if (res?.data) {
				setListMessage([...res.data.messageList]);
			}
		})();
	}, [page]);

	return (
		<div className="notifications">
			<div className="header-notify">
				<h4>Thông báo</h4>
				<small className="read-all">Đánh dấu tất cả là đã đọc</small>
			</div>
			<ul className="list-notify">
				{listMessage.map((message, index) => {
					if (index < limit) {
						return (
							<CardNotify key={message._id} message={message} />
						);
					}
					return null;
				})}
				{listMessage.length <= 0 && (
					<span className="msg">Bạn chưa có thông báo</span>
				)}
			</ul>
		</div>
	);
}

export default memo(Notifications);
