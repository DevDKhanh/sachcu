import { memo, useState, useEffect } from 'react';

import PlaceHolderImg from '../../../assets/images/placeholder-image.png';
import postAPI from '../../../api/postAPI';
import Rating from '../Rating/Rating';
import CardInfo from './components/CardInfo';
import LoadingPlaceHolder from '../Effect/LoadingPlaceHolder';
import './style/style.scss';

function CardPost({ data }) {
	const [load, setLoad] = useState(true);
	const [star, setStar] = useState();

	useEffect(() => {
		try {
			(async () => {
				const resReviews = await postAPI.getReviews(data.slug);
				if (resReviews.data) {
					/********** count star reviews **********/
					let count = 0;
					/********** total star reviews **********/
					const numberStar = resReviews.data.reduce((a, b) => {
						count++;
						return a + b.numberStar;
					}, 0);
					/********** set star reviews **********/
					setStar(numberStar / count);
				} else {
					setStar(5);
				}
			})();
		} catch (err) {}
	}, [data.slug]);

	return (
		<div className="card">
			<div className="card-img">
				<img
					onError={e => {
						e.target.onerror = null;
						e.target.src = PlaceHolderImg;
					}}
					onLoad={() => setLoad(false)}
					src={data.image}
					alt="img-post"
				/>
				<LoadingPlaceHolder dependency={load} />
			</div>
			<CardInfo data={data} />
			<div className="card-rating">
				<Rating star={star} />
			</div>
		</div>
	);
}

export default memo(CardPost);
