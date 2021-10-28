import React, { useEffect, useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';

import PlaceHolderUser from '../../../../assets/images/user-placeholder-image.jpg';
import usersAPI from '../../../../api/usersAPI';
import { convertTime } from '../../../../utils/convertTime';
import listCategory from '../../../../constant/listCategory';
import Rating from '../../../components/Rating';

function InfoPost({ post }) {
	const [category, setCategory] = useState({});
	const [timePost, setTimePost] = useState();
	const [user, setUser] = useState({});

	useEffect(() => {
		if (post.category) {
			setCategory(
				...listCategory.filter(item => item.value === post.category),
			);
		}
		return () => setCategory({});
	}, [post.category]);

	useEffect(() => {
		let timeoutId;
		if (post.createdAt) {
			const time = new Date(post.createdAt);
			timeoutId = setInterval(() => {
				setTimePost(convertTime(time));
			}, 100);
		}
		return () => clearTimeout(timeoutId);
	}, [post.createdAt]);

	useEffect(() => {
		if (post.email) {
			(async () => {
				try {
					const res = await usersAPI.getContact(post.email);
					if (res.status === 1) {
						setUser(res.data);
					}
				} catch (err) {}
			})();
		}

		return () => setUser({});
	}, [post.email]);

	return (
		<div className="info-post">
			<div className="info-post__user">
				<div className="avatar">
					<img
						onError={e => {
							e.target.onerror = null;
							e.target.src = PlaceHolderUser;
						}}
						src=""
						alt="avatar"
					/>
				</div>
				<div className="text">
					<div className="name-user">{`${user.lastName || ''} ${
						user.firstName || ''
					}`}</div>
					<div className="time">
						<BsClockHistory /> {timePost}
					</div>
				</div>
			</div>
			<div className="info-post__text">Thể loại: {category?.text}</div>
			<div className="info-post__text">Tác giả: {post.author}</div>
			<div className="info-post__content">
				<p>{post.content}</p>
			</div>
			<div className="info-post__contact">
				<a
					className="btn btn-contact-z"
					target="_blank"
					rel="noopener noreferrer"
					href={`https://zalo.me/${user?.phone}`}
				>
					Liên hệ
				</a>
			</div>
			<div className="info-post__rating">
				<Rating />
				<span className="btn-rating">Đánh giá</span>
			</div>
		</div>
	);
}

export default InfoPost;
