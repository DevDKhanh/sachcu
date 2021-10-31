import React, { useState } from 'react';
import PlaceHolderUser from '../../../assets/images/user-placeholder-image.jpg';
import LoadingPlaceHolder from '../Effect/LoadingPlaceHolder';

import './style/style.scss';

function AvatarImg({ avatar, className = '' }) {
	const [loadImg, setLoadImg] = useState(true);
	return (
		<div className={`avatar ${className}`}>
			<img
				onError={e => {
					e.target.onerror = null;
					e.target.src = PlaceHolderUser;
				}}
				onLoad={() => setLoadImg(false)}
				src={avatar}
				alt="avatar"
			/>
			<LoadingPlaceHolder dependency={loadImg} />
		</div>
	);
}

export default AvatarImg;
