import { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { BsFillBellFill } from 'react-icons/bs';
import Notifications from '../Notifications';
import { ProtectedComponent } from '../../../utils/Protected';

import './style/style.scss';

function BellNotify({ className = '' }) {
	const pathname = useLocation();
	const bellRef = useRef();
	const [show, setShow] = useState(false);

	useEffect(() => () => setShow(false), [pathname]);

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
			<span className="dot"></span>
			<ProtectedComponent dependency={show}>
				<Notifications onShow={setShow} />
			</ProtectedComponent>
		</div>
	);
}

export default memo(BellNotify);
