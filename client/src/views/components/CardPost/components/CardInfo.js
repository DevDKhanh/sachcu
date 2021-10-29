import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';

import { convertTime } from '../../../../utils/convertTime';
import usersAPI from '../../../../api/usersAPI';
import Title from './Title';
import listCategory from '../../../../constant/listCategory';
import PlaceHolderUser from '../../../../assets/images/user-placeholder-image.jpg';

function CardInfo({ data }) {
	const [category, setCategory] = useState({});
	const [timePost, setTimePost] = useState();
	const [user, setUser] = useState({});

	useEffect(() => {
		if (data.category) {
			setCategory(
				...listCategory.filter(item => item.value === data.category),
			);
		}
		return () => setCategory({});
	}, [data.category]);

	useEffect(() => {
		let timeoutId;
		if (data.createdAt) {
			const time = new Date(data.createdAt);
			timeoutId = setInterval(() => {
				setTimePost(convertTime(time));
			}, 100);
		}
		return () => clearTimeout(timeoutId);
	}, [data.createdAt]);

	useEffect(() => {
		if (data.idUser) {
			(async () => {
				try {
					const res = await usersAPI.getContact(data.idUser);
					if (res.status === 1) {
						setUser(res.data);
					}
				} catch (err) {}
			})();
		}

		return () => setUser({});
	}, [data.idUser]);

	return (
		<NavLink to={`/post/${data.slug}`} className="card-info">
			<Title>{data.title}</Title>
			<p className="card-info__time">
				<BsClockHistory />
				&nbsp; {timePost}
			</p>
			<p className="card-info__text">Thể loại: {category?.text}</p>
			<p className="card-info__text">Tác giả: {data.author}</p>
			<div className="card-info__user">
				<div className="avatar">
					<img
						onError={e => {
							e.target.onerror = null;
							e.target.src = PlaceHolderUser;
						}}
						src={user.avatar || ''}
						alt={`avatar`}
					/>
				</div>
				<p>{user.firstName}</p>
			</div>
		</NavLink>
	);
}

export default CardInfo;
