import { memo } from 'react';

import './style/style.scss';

function ButtonToggle({ onClick, className }) {
	return (
		<button
			onClick={onClick}
			className={`btn--toggle ${className}`}
		></button>
	);
}

export default memo(ButtonToggle);
