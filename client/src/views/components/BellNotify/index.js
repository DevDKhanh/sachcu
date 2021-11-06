import {
	memo,
	useEffect,
	useState,
	useRef,
	useCallback,
	useContext,
} from 'react';
import { useLocation } from 'react-router';
import { BsFillBellFill } from 'react-icons/bs';

import meAPI from '../../../api/meAPI';
import { SocketContext } from '../../../context/socket';
import Notifications from '../Notifications';
import { ProtectedComponent } from '../../../utils/Protected';

import './style/style.scss';

function BellNotify({ className = '' }) {
	const socket = useContext(SocketContext);
	const pathname = useLocation();
	const bellRef = useRef();
	const [show, setShow] = useState(false);
	const [count, setCount] = useState(0);

	const countMessageNotRead = useCallback(async () => {
		const res = await meAPI.getMessage({ limit: 1, page: 1 });
		if (res && res.data) {
			setCount(res.data.countMessage);
		}
	}, []);

	useEffect(() => {
		countMessageNotRead();
	}, [countMessageNotRead]);

	useEffect(() => {
		socket.on('message:count', number => {
			setCount(number);
		});
		return () => {
			setShow(false);
			socket.off('message:count');
		};
	}, [pathname, socket]);

	useEffect(() => {
		const handleClick = e => {
			if (bellRef.current && !bellRef.current.contains(e.target)) {
				setShow(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [bellRef, setShow]);

	return (
		<div
			className={`${className} bell-notify`}
			onClick={() => setShow(true)}
			ref={bellRef}
		>
			<BsFillBellFill />

			<ProtectedComponent dependency={count > 0}>
				<span className="dot"></span>
			</ProtectedComponent>

			<ProtectedComponent dependency={show}>
				<Notifications onShow={setShow} />
			</ProtectedComponent>
		</div>
	);
}

export default memo(BellNotify);
