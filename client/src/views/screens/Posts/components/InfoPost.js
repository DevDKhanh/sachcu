import React, { useEffect, useLayoutEffect, useState, memo } from 'react';
import { BsClockHistory } from 'react-icons/bs';

import PlaceHolderUser from '../../../../assets/images/user-placeholder-image.jpg';
import usersAPI from '../../../../api/usersAPI';
import postAPI from '../../../../api/postAPI';
import { convertTime } from '../../../../utils/convertTime';
import listCategory from '../../../../constant/listCategory';
import Rating from '../../../components/Rating/Rating';
import FormRating from '../../../components/Rating/FormRating';
import { ProtectedComponent } from '../../../../utils/Protected';

function InfoPost({ post }) {
	const [category, setCategory] = useState({});
	const [star, setStar] = useState();
	const [timePost, setTimePost] = useState();
	const [showFormRating, setShowFormRating] = useState(false);
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

	useLayoutEffect(() => {
		if (post.idUser && post.slug) {
			(async () => {
				try {
					const [resUser, resReviews] = await Promise.all([
						usersAPI.getContact(post.idUser),
						postAPI.getReviews(post.slug),
					]);

					//set info user post
					if (resUser.status === 1) {
						setUser(resUser.data);
					}

					//count star reviews
					if (resReviews.data) {
						let count = 0;
						const numberStar = resReviews.data.reduce((a, b) => {
							count++;
							return a + b.numberStar;
						}, 0);
						setStar(numberStar / count);
					} else {
						setStar(5);
					}
				} catch (err) {}
			})();
		}

		return () => setUser({});
	}, [post.idUser, post.slug]);

	return (
		<React.Fragment>
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
				<div className="info-post__text">
					Thể loại: {category?.text}
				</div>
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
					<ProtectedComponent dependency={star}>
						<Rating star={star} />
						<span
							className="btn-rating"
							onClick={() => setShowFormRating(true)}
						>
							Đánh giá
						</span>
					</ProtectedComponent>
				</div>
			</div>
			<ProtectedComponent dependency={showFormRating}>
				<FormRating
					onClose={setShowFormRating}
					idUser={post.idUser}
					slug={post.slug}
				/>
			</ProtectedComponent>
		</React.Fragment>
	);
}

export default memo(InfoPost);
