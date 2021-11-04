import { memo } from 'react';

import './style/style.scss';

function ButtonToggle({ onClick, className = '', toggle = null }) {
	return (
		<button
			onClick={onClick}
			className={`btn--toggle ${
				toggle !== null ? (toggle ? 'active' : 'un-active') : ''
			} ${className}`}
		></button>
	);
}

export default memo(ButtonToggle);
