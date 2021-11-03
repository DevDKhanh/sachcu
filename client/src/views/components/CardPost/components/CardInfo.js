import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../../hooks';
import { convertTime } from '../../../../utils/convertTime';
import { ProtectedComponent } from '../../../../utils/Protected';
import ButtonClose from '../../ButtonClose';
import ButtonToggle from '../../ButtonToggle';
import usersAPI from '../../../../api/usersAPI';
import meAPI from '../../../../api/meAPI';
import Title from './Title';
import AvatarImg from '../../AvatarImg';
import LoadingPlaceHolder from '../../Effect/LoadingPlaceHolder';
import listCategory from '../../../../constant/listCategory';

function CardInfo({ data, isEdit, onDelete }) {
	const { newCancelToken } = useCancelToken();
	const { infoUser } = useSelector(state => state.user);
	const [category, setCategory] = useState({});
	const [timePost, setTimePost] = useState();
	const [user, setUser] = useState({});
	const [isActive, setIsActive] = useState(data.status === 0);

	/********** get text category **********/
	useEffect(() => {
		if (data.category) {
			setCategory(
				...listCategory.filter(item => item.value === data.category),
			);
		}
		return () => setCategory({});
	}, [data.category]);

	/********** time create Post **********/
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

	/********** get user info from id **********/
	useEffect(() => {
		if (data.idUser) {
			(async () => {
				try {
					/********** call api **********/
					const res = await usersAPI.getContact(
						data.idUser,
						newCancelToken(),
					);
					if (res.status === 1) {
						setUser(res.data);
					}
				} catch (err) {}
			})();
		}

		return () => {
			setUser({});
		};
	}, [data.idUser, newCancelToken]);

	const handleActive = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const res = await meAPI.updateStatus(
					{
						id: data._id,
						status: isActive ? 1 : 0,
					},
					newCancelToken(),
				);
				if (res.status === 1) {
					setIsActive(!isActive);
					toast.info('Cập nhật trạng thái thành công');
				} else {
					toast.error(
						'Không thể cập nhật trạng thái cho bài viết này',
					);
				}
			} catch (err) {}
		})();
	}, [isActive, data._id, newCancelToken]);

	const handleDeletePost = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const res = await meAPI.deletePost(data._id, newCancelToken());
				if (res.status === 1) {
					toast.info('Đã xóa bài viết');
					onDelete(data._id);
				} else {
					toast.error(
						'Không thể cập nhật trạng thái cho bài viết này',
					);
				}
			} catch (err) {}
		})();
	}, [onDelete, data._id, newCancelToken]);

	return (
		<span className="card-info">
			<ProtectedComponent
				dependency={infoUser.idUser === data.idUser && isEdit}
			>
				<ButtonClose
					className="btn--delete"
					onClick={handleDeletePost}
				/>
				<ButtonToggle
					onClick={handleActive}
					className={`btn--change-status ${!isActive && 'delete'}`}
				/>
			</ProtectedComponent>
			<NavLink to={`/post/${data.slug}`} className="card-link">
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
				<p className="card-info__text">
					Trạng thái:{' '}
					<span className={`status ${isActive && 'isActive'}`}>
						{isActive ? 'Sẵn sàng' : 'Đã cho mượn'}
					</span>
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
		</span>
	);
}

export default memo(CardInfo);
