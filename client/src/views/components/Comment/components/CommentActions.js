import { memo, useRef, useEffect, useState, useContext } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { SocketContext } from '../../../../context/socket';

function CommentsActions({
	onClose,
	id,
	isReply,
	onSetCommentReply,
	onSetCountCommentReply,
	onSetComments,
}) {
	const socket = useContext(SocketContext);
	const menuRef = useRef();
	const [isTopCurent, setIsTopCurent] = useState(null);

	useEffect(() => {
		if (menuRef.current) {
			const winDowHeight = window.innerHeight;
			const { y } = menuRef.current.getBoundingClientRect();
			setIsTopCurent(winDowHeight / y > 2);
		}
	}, []);

	useEffect(() => {
		const handleClick = e => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				onClose(prev => !prev);
			}
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [menuRef, onClose]);

	useEffect(() => {
		socket.on('comment:deleteSuccess', id => {
			onSetComments(prev => prev.filter(comment => comment._id !== id));
			toast.info('Xóa bình luận thành công');
		});

		socket.on('commentReply:deleteSuccess', id => {
			onSetCountCommentReply(prev => prev - 1);
			onSetCommentReply(prev => {
				return prev.filter(comment => comment._id !== id);
			});

			toast.info('Xóa bình luận thành công');
		});

		return () => {
			socket.off('comment:deleteSuccess');
			socket.off('commentReply:deleteSuccess');
		};
	}, [socket, onSetComments, onSetCommentReply, onSetCountCommentReply]);

	const handleDelete = () => {
		if (isReply) {
			socket.emit('commentReply:delete', { id });
		} else {
			socket.emit('comment:delete', { id });
		}
	};

	return (
		<ul
			ref={menuRef}
			className={`comment-list-action ${
				isTopCurent !== null
					? isTopCurent
						? 'show-top'
						: 'show-bottom'
					: null
			}`}
		>
			<li className="item" onClick={handleDelete}>
				<FaTrash /> Xóa bình luận
			</li>
			<li className="item">
				<FaPencilAlt /> Sửa bình luận
			</li>
		</ul>
	);
}

export default memo(CommentsActions);
