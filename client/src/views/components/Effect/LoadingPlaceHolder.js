import React from 'react';

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
