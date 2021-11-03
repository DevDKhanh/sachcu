import { memo, useState, useEffect } from 'react';

import { useCancelToken } from '../../../hooks';
import PlaceHolderImg from '../../../assets/images/placeholder-image.png';
import postAPI from '../../../api/postAPI';
import Rating from '../Rating/Rating';
import CardInfo from './components/CardInfo';
import LoadingPlaceHolder from '../Effect/LoadingPlaceHolder';
import './style/style.scss';

function CardPost({ data, showStar = true, isEdit = false, onDelete }) {
	const { newCancelToken } = useCancelToken();
	const [load, setLoad] = useState(true);
	const [star, setStar] = useState();

	useEffect(() => {
		try {
			(async () => {
				/********** call api **********/
				const resReviews = await postAPI.getReviews(
					data.slug,
					newCancelToken(),
				);
				if (resReviews) {
					if (resReviews?.data) {
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
				}
			})();
		} catch (err) {}
	}, [data.slug, newCancelToken]);

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
			<CardInfo data={data} isEdit={isEdit} onDelete={onDelete} />
			{showStar && (
				<div className="card-rating">
					<Rating star={star} />
				</div>
			)}
		</div>
	);
}

export default memo(CardPost);
