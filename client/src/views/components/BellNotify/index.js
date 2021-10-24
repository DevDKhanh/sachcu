import React from 'react';
import { BsFillBellFill } from 'react-icons/bs';

import './style/style.scss';

function BellNotify({ className = '' }) {
	return (
		<div className={`${className} bell-notify`}>
			<BsFillBellFill />
			<span className="dot"></span>
		</div>
	);
}

export default BellNotify;
