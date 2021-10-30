import React, { useState, useContext, useEffect, memo } from 'react';

import {
	trimSpaces,
	pasteAsPlainText,
} from '../../../utils/handleContentEditable';
import { SocketContext } from '../../../context/socket';
import ContentEditable from 'react-contenteditable';
import './style/style.scss';

function FormComment({ placeholder, slug }) {
	const socket = useContext(SocketContext);
	const [comment, setComment] = useState('');
	const [submit, setSubMit] = useState(false);

	const handleSubMit = e => {
		e.preventDefault();
		setSubMit(true);
	};

	const handleEnter = e => {
		const keyCode = e.which || e.keyCode;
		if (keyCode === 13) {
			setSubMit(true);
		}
		keyCode === 13 && e.preventDefault();
	};

	const handleChange = e => {
		const content = e.target.value;
		setComment(content.trim());
	};

	useEffect(() => setComment(''), [slug]);

	useEffect(() => {
		if (submit) {
			if (trimSpaces(comment).trim() !== '') {
				socket.emit('comment:create', {
					slug,
					comment: trimSpaces(comment),
				});
			} else {
				setSubMit(false);
			}
		}
		return () => socket.off('comment:create');
	}, [submit, comment, socket, slug]);

	useEffect(() => {
		socket.on('comment:successCreate', data => {
			console.log(data);
			setComment('');
			setSubMit(false);
		});

		return () => {
			socket.off('comment:successCreate');
		};
	}, [socket]);

	return (
		<React.Fragment>
			<h2 className="title">Bình luận</h2>
			<div className="form-comment">
				<div className="avatar">
					<img
						src="https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-9/169121906_1673758642825329_1633927339019676240_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rrevtIymj6QAX_xoVTn&_nc_ht=scontent.fhan3-4.fna&oh=f60ee5853c8c2af7bd7378fd29d5f358&oe=61983826"
						alt="avatar-me"
					/>
				</div>
				<form onSubmit={handleSubMit}>
					<div className="group-form">
						<div className="group-element">
							<ContentEditable
								html={comment}
								onChange={handleChange}
								onPaste={pasteAsPlainText}
								onKeyPress={handleEnter}
								tagName="div"
								role="textbox"
								aria-multiline={true}
								className="input-element content-i-comment"
								placeholder={placeholder}
							/>
						</div>
					</div>
					<div className="group-btn">
						<button
							type="submit"
							className={`${
								trimSpaces(comment).trim() !== '' && 'active'
							} btn`}
						>
							Bình luận
						</button>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
}

export default memo(FormComment);
