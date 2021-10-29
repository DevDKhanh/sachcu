import { memo } from 'react';

import PlaceHolderImg from '../../../assets/images/placeholder-image.png';
import Rating from '../Rating/Rating';
import CardInfo from './components/CardInfo';
import './style/style.scss';

function CardPost({ data }) {
	return (
		<div className="card">
			<div className="card-img">
				<img
					onError={e => {
						e.target.onerror = null;
						e.target.src = PlaceHolderImg;
					}}
					src={data.image}
					alt="img-post"
				/>
			</div>
			<CardInfo data={data} />
			<div className="card-rating">
				<Rating star={3} />
			</div>
		</div>
	);
}

export default memo(CardPost);
