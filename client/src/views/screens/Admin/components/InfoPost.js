import { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../../hooks';
import usersAPI from '../../../../api/usersAPI';
import adminAPI from '../../../../api/adminAPI';
import AvatarImg from '../../../components/AvatarImg';
import listCategory from '../../../../constant/listCategory';
import ButtonToggle from '../../../components/ButtonToggle';

function InfoPost({ props, onDeletePost }) {
	const { newCancelToken } = useCancelToken();
	const [toggle, setToggle] = useState(props.isDelete);
	const [category, setCategory] = useState({});
	const [user, setUser] = useState({});
	const [post, setPost] = useState({});

	useEffect(() => {
		setPost(props);
	}, [props]);

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

	const handleActivePost = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const data = {
					id: props._id,
					toggle: !toggle,
				};
				const res = await adminAPI.updateActivePost(
					data,
					newCancelToken(),
				);
				if (res) {
					toast.info('Đã cập nhật bài viết');
					setPost(res);
					setToggle(!toggle);
				} else {
					toast.error(
						'Không thể cập nhật trạng thái cho bài viết này',
					);
				}
			} catch (err) {}
		})();
	}, [props._id, newCancelToken, toggle, setToggle, setPost]);

	const handleDelete = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const res = await adminAPI.deletePost(
					props._id,
					newCancelToken(),
				);
				if (res) {
					toast.info('Đã xóa bài viết');
					onDeletePost(res);
				} else {
					toast.error(
						'Không thể cập nhật trạng thái cho bài viết này',
					);
				}
			} catch (err) {}
		})();
	}, [onDeletePost, newCancelToken, props._id]);

	const classTag = useMemo(() => {
		if (!post.isReady) return { class: 'not-ready', text: 'Chưa duyệt' };
		if (post.isDelete) return { class: 'delete', text: 'Đã ẩn' };
		if (post.status === 0)
			return { class: 'active', text: 'Đang sẵn sàng' };
		else return { class: 'un-active', text: 'Đã cho mượn' };
	}, [post.isDelete, post.status, post.isReady]);

	return (
		<tr>
			<td>
				<AvatarImg avatar={user.avatar} />
			</td>
			<td>{user.lastName + ' ' + user.firstName}</td>
			<td>
				<NavLink to={`/post/${post.slug}`}>{post.title}</NavLink>
			</td>
			<td>{category.text}</td>
			<td>{post.author}</td>
			<td>
				<span className={`tag ${classTag.class}`}>{classTag.text}</span>
			</td>
			<td>
				<span>
					{new Date(post.createdAt).toLocaleDateString('en-GB')}
				</span>
			</td>
			<td>
				<ButtonToggle toggle={!toggle} onClick={handleActivePost} />
			</td>
			<td>
				<button className="btn--delete" onClick={handleDelete}>
					Xóa bài đăng
				</button>
			</td>
		</tr>
	);
}

export default memo(InfoPost);
