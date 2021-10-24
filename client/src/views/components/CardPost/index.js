import React from 'react';
import { NavLink } from 'react-router-dom';

import PlaceHolderImg from '../../../assets/images/placeholder-image.png';
import Rating from '../Rating';
import CardInfo from './components/CardInfo';
import './style/style.scss';

function CardPost({ data }) {
	return (
		<NavLink to={`/post/${data._id}`} className="card">
			<div className="card-img">
				<img
					onError={e => {
						e.target.onerror = null;
						e.target.src = PlaceHolderImg;
					}}
					src={data.img}
					alt="img-post"
				/>
			</div>
			<CardInfo data={data} />
			<div className="card-rating">
				<Rating />
			</div>
		</NavLink>
	);
}

export default CardPost;
