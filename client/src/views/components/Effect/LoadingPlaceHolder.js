import React from 'react';

import './style/style.scss';

function LoadingPlaceHolder({
	styleLoading = '1',
	className = '',
	dependency = true,
}) {
	return (
		<React.Fragment>
			{dependency && (
				<span
					className={`loading-cover-${styleLoading} ${className}`}
				></span>
			)}
		</React.Fragment>
	);
}

export default LoadingPlaceHolder;
