import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';

import usersAPI from '../../../../api/usersAPI';
import Title from './Title';
import AvatarImg from '../../AvatarImg';
import LoadingPlaceHolder from '../../Effect/LoadingPlaceHolder';
import listCategory from '../../../../constant/listCategory';
import { convertTime } from '../../../../utils/convertTime';

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
				<LoadingPlaceHolder dependency={!timePost} />
			</p>
			<p className="card-info__text">
				Thể loại: {category?.text}
				<LoadingPlaceHolder dependency={!category?.text} />
			</p>
			<p className="card-info__text">
				Tác giả: {data.author}
				<LoadingPlaceHolder dependency={!data.author} />
			</p>
			<div className="card-info__user">
				<AvatarImg avatar={user.avatar} />
				<p className="name-user">
					{user.firstName}
					<LoadingPlaceHolder dependency={!user.firstName} />
				</p>
			</div>
		</NavLink>
	);
}

export default CardInfo;
