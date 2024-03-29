import { memo, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../../hooks';
import adminAPI from '../../../../api/adminAPI';
import AvatarImg from '../../../components/AvatarImg';
import Dialog from '../../../components/Dialog';

function InfoPost({ props, onDeletePost }) {
	const { newCancelToken } = useCancelToken();
	const [post, setPost] = useState({});
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		setPost(props);
	}, [props]);

	const handleDelete = useCallback(() => {
		(async () => {
			try {
				/********** call api **********/
				const res = await adminAPI.deleteUser(
					props._id,
					newCancelToken(),
				);
				if (res) {
					toast.info('Đã xóa user');
					onDeletePost(res);
				} else {
					toast.error('Có lỗi đã xảy ra');
				}
			} catch (err) {}
		})();
	}, [onDeletePost, newCancelToken, props._id]);

	return (
		<>
			<Dialog
				active={showDialog}
				txtBtnSubmit="Xóa ngay"
				title="Bạn chắc chắn muốn xóa người dùng này?"
				styleDialog="danger"
				onSubmit={handleDelete}
				onClose={() => setShowDialog(false)}
			/>
			<tr>
				<td>
					<AvatarImg avatar={props.avatar} />
				</td>
				<td>{props.lastName + ' ' + props.firstName}</td>
				<td>{props.phone}</td>
				<td>{props.email}</td>
				<td>
					<span>
						{new Date(post.createdAt).toLocaleDateString('en-GB')}
					</span>
				</td>
				<td>
					{!props.isAdmin && (
						<button
							className="btn--delete"
							onClick={() => setShowDialog(true)}
						>
							Xóa user
						</button>
					)}
				</td>
			</tr>
		</>
	);
}

export default memo(InfoPost);
