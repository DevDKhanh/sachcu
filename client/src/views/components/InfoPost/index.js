import React, { useEffect, useState, memo } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import { useCancelToken } from '../../../hooks';
import { convertTime } from '../../../utils/convertTime';
import { ProtectedComponent } from '../../../utils/Protected';
import LoadingPlaceHolder from '../../components/Effect/LoadingPlaceHolder';
import AvatarImg from '../../components/AvatarImg';
import usersAPI from '../../../api/usersAPI';
import postAPI from '../../../api/postAPI';
import listCategory from '../../../constant/listCategory';
import Rating from '../../components/Rating/Rating';
import FormRating from '../../components/Rating/FormRating';
import './style/style.scss';

function InfoPost({ post }) {
	const { infoUser, isLogged } = useSelector(state => state.user);
	const { newCancelToken } = useCancelToken();
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

	useEffect(() => {
		if (post.idUser && post.slug) {
			(async () => {
				try {
					const [resUser, resReviews] = await Promise.all([
						usersAPI.getContact(post.idUser, newCancelToken()),
						postAPI.getReviews(post.slug, newCancelToken()),
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

		return () => {
			setUser({});
		};
	}, [post.idUser, post.slug, newCancelToken]);

	return (
		<React.Fragment>
			<div className="info-post">
				<div className="info-post__user">
					<AvatarImg avatar={user.avatar} />
					<div className="text">
						<div className="name-user">
							<LoadingPlaceHolder
								dependency={!user.lastName || !timePost}
							/>
							{`${user.lastName || ''} ${user.firstName || ''}`}
						</div>
						<div className="time">
							<LoadingPlaceHolder
								dependency={!user.lastName || !timePost}
							/>
							<BsClockHistory /> {timePost}
						</div>
					</div>
				</div>
				<div className="info-post__text">
					Thể loại: {category?.text}
					<LoadingPlaceHolder dependency={!user.lastName} />
				</div>
				<div className="info-post__text">
					Tác giả: {post.author}
					<LoadingPlaceHolder dependency={!user.lastName} />
				</div>
				<div className="info-post__content">
					<p className="text">{post.content}</p>
					<LoadingPlaceHolder dependency={!user.lastName} />
				</div>
				<ProtectedComponent dependency={isLogged}>
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
				</ProtectedComponent>
				<div className="info-post__rating">
					<ProtectedComponent dependency={star}>
						<Rating star={star} />
						<ProtectedComponent dependency={isLogged}>
							<span
								className="btn-rating"
								onClick={() => setShowFormRating(true)}
							>
								Đánh giá
							</span>
						</ProtectedComponent>
					</ProtectedComponent>
				</div>
			</div>
			<ProtectedComponent dependency={showFormRating && isLogged}>
				<FormRating
					onClose={setShowFormRating}
					idUser={infoUser.idUser}
					slug={post.slug}
				/>
			</ProtectedComponent>
		</React.Fragment>
	);
}

export default memo(InfoPost);
