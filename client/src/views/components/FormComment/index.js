import React, { useState, useEffect } from 'react';

import ContentEditable from 'react-contenteditable';
import './style/style.scss';

function FormComment() {
	const textPlaceHolder = 'Viết bình luận của bạn';
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

	useEffect(() => {
		if (submit && comment.trim() !== '') {
			console.log(comment);
			setComment('');
			setSubMit(false);
		}
	}, [submit, comment]);

	return (
		<React.Fragment>
			<h1 className="title">Bình luận</h1>
			<div className="form-comment">
				<div className="avatar">
					<img
						src="https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-9/169121906_1673758642825329_1633927339019676240_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rrevtIymj6QAX_xoVTn&_nc_ht=scontent.fhan3-4.fna&oh=f60ee5853c8c2af7bd7378fd29d5f358&oe=61983826"
						alt="avatar-me"
					/>
				</div>
				<form onSubmit={handleSubMit}>
					<div className="group-form">
						<div className="group-element" aria-multiline>
							<ContentEditable
								html={comment}
								onChange={handleChange}
								onKeyPress={handleEnter}
								tagName="div"
								role="textbox"
								aria-multiline={true}
								className="input-element content-i-comment"
								placeholder={textPlaceHolder}
							/>
						</div>
					</div>
					<div className="group-btn">
						<button
							type="submit"
							className={`${
								comment.trim() !== '' && 'active'
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

export default FormComment;
