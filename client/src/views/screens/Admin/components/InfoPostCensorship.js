import { memo, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../../hooks';
import { trimSpaces } from '../../../../utils/handleContentEditable';
import { ProtectedComponent } from '../../../../utils/Protected';
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
	const [message, setMessage] = useState('');
	const [showForm, setShowForm] = useState(false);

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

	/********** update State msg when input onChange **********/
	const handleChange = e => {
		const content = e.target.value;
		setMessage(content.trim());
	};

	const handleAccept = async () => {
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
				toast.error('Không thể cập nhật trạng thái cho bài viết này');
			}
		} catch (err) {}
	};

	const handleNotAccept = async () => {
		if (trimSpaces(message).trim() !== '') {
			socket.emit('message:notAccpectPost', {
				idUser: props.idUser,
				slug: props.slug,
				title: props.title,
				content: trimSpaces(message),
			});
			setShowForm(false);
			onSetPosts(prev => prev.filter(post => post._id !== props._id));
		} else {
			toast.warn('Nhập lý do từ chối');
		}
	};

	return (
		<>
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
					<button
						className="btn--not-accept"
						onClick={() => setShowForm(true)}
					>
						Từ chối
					</button>
				</td>
			</tr>
			<ProtectedComponent dependency={showForm}>
				<div className="form-send-msg">
					<ContentEditable
						html={message}
						onChange={handleChange}
						tagName="div"
						role="textbox"
						aria-multiline={true}
						className="input-element"
						placeholder={'Nhập lý do từ chối'}
					/>
					<div className="group-btn">
						<div
							className="btn btn--secondary"
							onClick={() => {
								setShowForm(false);
								setMessage('');
							}}
						>
							Hủy
						</div>
						<div
							className="btn btn--primary"
							onClick={handleNotAccept}
						>
							Gửi
						</div>
					</div>
				</div>
			</ProtectedComponent>
		</>
	);
}

export default memo(InfoPost);
