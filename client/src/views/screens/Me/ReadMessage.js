import { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

import meAPI from '../../../api/meAPI';
import './style/readMail.scss';

function ReadMessage() {
	const { id } = useParams();
	const history = useHistory();
	const [message, setMessage] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const res = await meAPI.readMessageNotAccpet({ id });
				if (res.status === 1) {
					setMessage(res.data);
					console.log(res.data);
				} else {
					toast.info('Không có thông báo này');
					history.push('/');
				}
			} catch (err) {
				toast.error('Đã xảy ra lỗi');
				history.push('/');
			}
		})();
	}, [history, id]);

	return (
		<div className="page-main">
			<div className="grid wide">
				<div className="read-mail">
					<div className="img-mail">
						<img
							src="https://i.pinimg.com/originals/61/98/ed/6198ed0c12d7aa08d099294f114fc6f5.jpg"
							alt="mail"
						/>
					</div>
					<div className="title">
						<h2>{message.message}</h2>
					</div>
					<div className="content">
						<p>Lý do từ chối:</p>
						<br />
						<p
							dangerouslySetInnerHTML={{
								__html: message.content,
							}}
						></p>
					</div>
					<div className="actions">
						<NavLink
							to="/me/add-post"
							className="btn btn--primary btn--round"
						>
							Đăng tin mới
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(ReadMessage);
