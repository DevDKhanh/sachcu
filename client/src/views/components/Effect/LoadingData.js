import React from 'react';
import ImgLoading from '../../../assets/svg/loading-data.svg';

import './style/style.scss';

function LoadingData({ isLoad = true, className = '', text = 'Đang tải...' }) {
	return (
		<>
			{isLoad && (
				<div className={`effect-loading-data ${className}`}>
					<span className="icon">
						<img src={ImgLoading} alt="loading" />
					</span>
					<span className="text">{text}</span>
				</div>
			)}
		</>
	);
}

export default LoadingData;
