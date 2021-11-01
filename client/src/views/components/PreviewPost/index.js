import { useState, memo } from 'react';

import LoadingPlaceHolder from '../Effect/LoadingPlaceHolder';
import PlaceHolderImg from '../../../assets/images/placeholder-image.png';

import './style/style.scss';

function PreviewPost({ title, img = '' }) {
	const [loadImg, setLoadImg] = useState(true);

	return (
		<div className="preview-post">
			<h1 className="title">
				{title}
				<LoadingPlaceHolder dependency={!title} />
			</h1>
			<div className="image">
				<img
					onLoad={() => setLoadImg(false)}
					onError={e => {
						e.target.onerror = null;
						e.target.src = PlaceHolderImg;
					}}
					src={img}
					alt="post"
				/>
				<LoadingPlaceHolder dependency={loadImg} />
			</div>
		</div>
	);
}

export default memo(PreviewPost);
