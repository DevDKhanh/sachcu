import React, { memo, useRef, useEffect, useState, useContext } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// import { toast } from 'react-toastify';

import { SocketContext } from '../../../../context/socket';

function CommentsActions({ onClose, id, isReply, onForm }) {
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

	const handleDelete = () => {
		if (isReply) {
			socket.emit('commentReply:delete', { id });
		} else {
			socket.emit('comment:delete', { id });
		}
	};

	const handleShowFromEdit = () => {
		onForm(true);
		onClose(false);
	};

	return (
		<React.Fragment>
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
				<li className="item" onClick={handleShowFromEdit}>
					<FaPencilAlt /> Sửa bình luận
				</li>
			</ul>
		</React.Fragment>
	);
}

export default memo(CommentsActions);
