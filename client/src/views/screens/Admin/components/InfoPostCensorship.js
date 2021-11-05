import { memo, useState, useEffect, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../../hooks';
import { SocketContext } from '../../../../context/socket';
import usersAPI from '../../../../api/usersAPI';
import adminAPI from '../../../../api/adminAPI';
import AvatarImg from '../../../components/AvatarImg';
import listCategory from '../../../../constant/listCategory';

function InfoPost({ props, onSetPosts }) {
	const socket = useContext(SocketContext);
	const { newCancelToken } = useCancelToken();
	const [category, setCategory] = useState({});
	const [user, setUser] = useState({});

	useEffect(() => {
		if (props.category) {
			setCategory(
				...listCategory.filter(item => item.value === props.category),
			);
		}
		return () => setCategory({});
	}, [props.category]);

	/********** get user info from id **********/
	useEffect(() => {
		if (props.idUser) {
			(async () => {
				try {
					/********** call api **********/
					const res = await usersAPI.getContact(
						props.idUser,
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
	}, [props.idUser, newCancelToken]);

	const handleAccept = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const res = await adminAPI.accpetPost(
					{ id: props._id },
					newCancelToken(),
				);
				if (res) {
					onSetPosts(prev => prev.filter(post => post._id !== res));
					toast.success('Đã chấp nhận bài viết');
					socket.emit('message:accpectPost', {
						idUser: props.idUser,
						slug: props.slug,
						title: props.title,
					});
				} else {
					toast.error(
						'Không thể cập nhật trạng thái cho bài viết này',
					);
				}
			} catch (err) {}
		})();
	}, [
		newCancelToken,
		onSetPosts,
		props._id,
		props.idUser,
		props.slug,
		props.title,
		socket,
	]);

	return (
		<tr>
			<td>
				<AvatarImg avatar={user.avatar} />
			</td>
			<td>{user.lastName + ' ' + user.firstName}</td>
			<td>
				<NavLink to={`/post/${props.slug}`}>{props.title}</NavLink>
			</td>
			<td>{category.text}</td>
			<td>{props.author}</td>
			<td>
				<span>
					{new Date(props.createdAt).toLocaleDateString('en-GB')}
				</span>
			</td>
			<td>
				<button className="btn--accept" onClick={handleAccept}>
					Phê duyệt
				</button>
			</td>
			<td>
				<button className="btn--not-accept" onClick={handleAccept}>
					Từ chối
				</button>
			</td>
		</tr>
	);
}

export default memo(InfoPost);
