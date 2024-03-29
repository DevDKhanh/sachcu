import React, { memo, useRef, useEffect, useState, useContext } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// import { toast } from 'react-toastify';

import { SocketContext } from '../../../../context/socket';
import Dialog from '../../Dialog';

function CommentsActions({ onClose, id, isReply, onForm }) {
	const socket = useContext(SocketContext);
	const menuRef = useRef();
	const [isTopCurent, setIsTopCurent] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

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
			<Dialog
				active={showDialog}
				txtBtnSubmit="Xóa"
				title="Bạn muốn xóa bình luận này?"
				styleDialog="primary"
				onSubmit={handleDelete}
				onClose={() => setShowDialog(false)}
			/>
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
				<li className="item" onClick={() => setShowDialog(true)}>
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
