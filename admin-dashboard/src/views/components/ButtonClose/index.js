import { memo } from 'react';
import { FaTimes } from 'react-icons/fa';

import './style/style.scss';

function ButtonClose({ onClick, className }) {
	return (
		<button onClick={onClick} className={`btn--close ${className}`}>
			<FaTimes />
		</button>
	);
}

export default memo(ButtonClose);
