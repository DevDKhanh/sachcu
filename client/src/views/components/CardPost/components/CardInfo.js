import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';

import PlaceHolderUser from '../../../../assets/images/user-placeholder-image.jpg';

function CardInfo({ data }) {
	return (
		<NavLink to={`/post/${data._id}`} className="card-info">
			<h4 className="card-info__title">{data.titlePost}</h4>
			<p className="card-info__time">
				<BsClockHistory />
				&nbsp; {data.time}
			</p>
			<p className="card-info__text">Thể loại: Toán</p>
			<p className="card-info__text">Tác giả: Duy kHánh</p>
			<div className="card-info__user">
				<div className="avatar">
					<img
						onError={e => {
							e.target.onerror = null;
							e.target.src = PlaceHolderUser;
						}}
						src={data.avatar || ''}
						alt={`avatar`}
					/>
				</div>
				<p>{data.nameUser}</p>
			</div>
		</NavLink>
	);
}

export default CardInfo;
