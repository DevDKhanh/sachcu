import React, { useState, useContext, useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';

import {
	trimSpaces,
	pasteAsPlainText,
} from '../../../utils/handleContentEditable';
import { ProtectedComponent } from '../../../utils/Protected';
import { SocketContext } from '../../../context/socket';
import ContentEditable from 'react-contenteditable';
import AvatarImg from '../AvatarImg';
import './style/style.scss';

function FormComment({
	placeholder,
	id,
	slug,
	onClose,
	isReply,
	isEdit,
	isStyleReply,
	valueCurrent = '',
	textSubmit = 'Bình luận',
	title,
}) {
	const socket = useContext(SocketContext);
	const fromRef = useRef();
	const { isLogged, infoUser } = useSelector(state => state.user);
	const [comment, setComment] = useState(valueCurrent);
	const [submit, setSubMit] = useState(false);

	/********** compartment form submit with event default **********/
	const handleSubMit = e => {
		e.preventDefault();
		setSubMit(true);
	};

	/********** compartment create new line when Press Enter **********/
	const handleEnter = e => {
		const keyCode = e.which || e.keyCode;
		if (keyCode === 13) {
			setSubMit(true);
		}
		keyCode === 13 && e.preventDefault();
	};

	/********** update State comment when input onChange **********/
	const handleChange = e => {
		const content = e.target.value;
		setComment(content.trim());
	};

	/********** clear content input when slug change **********/
	useEffect(() => {
		return () => setComment('');
	}, [slug]);

	useEffect(() => {
		if (submit) {
			if (trimSpaces(comment).trim() !== '') {
				if (isEdit) {
					socket.emit('comment:edit', {
						id,
						isReply,
						slug,
						comment: trimSpaces(comment),
					});
					onClose(false);
				} else if (isReply) {
					socket.emit('commentReply:create', {
						idComment: id,
						slug,
						comment: trimSpaces(comment),
					});
				} else {
					socket.emit('comment:create', {
						slug,
						comment: trimSpaces(comment),
					});
				}
				setComment('');
				setSubMit(false);
			} else {
				setSubMit(false);
			}
		}
		return () => {
			socket.off('comment:create');
			socket.off('commentReply:create');
		};
	}, [submit, comment, socket, slug, id, isReply, isEdit, onClose]);
	return (
		<React.Fragment>
			<h2 className="title">{title}</h2>
			<ProtectedComponent dependency={isLogged}>
				<div
					className={`form-comment ${isStyleReply && 'form--reply'}`}
				>
					<AvatarImg avatar={infoUser.avatar} />
					<form onSubmit={handleSubMit}>
						<div className="group-form">
							<div className="group-element">
								<ContentEditable
									ref={fromRef}
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
							{onClose && (
								<div
									onClick={() => onClose(false)}
									className="btn btn--round btn--secondary"
								>
									Hủy
								</div>
							)}

							<button
								type="submit"
								className={`btn ${
									trimSpaces(comment).trim() !== ''
										? 'unactive'
										: 'active'
								}`}
							>
								{textSubmit}
							</button>
						</div>
					</form>
				</div>
			</ProtectedComponent>
		</React.Fragment>
	);
}

export default memo(FormComment);
