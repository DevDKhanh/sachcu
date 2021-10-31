import React, { useState, useEffect } from 'react';

import FormComment from '../../FormComment/index';
import '../style/commentControl.scss';

function CommentControl({
	isReply,
	timeComment,
	id,
	slug,
	onSetShowReply,
	onSetCommentsReply,
}) {
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (showForm) {
			onSetShowReply(true);
		}
	}, [showForm, onSetShowReply]);

	return (
		<>
			<div className="control">
				{!isReply && (
					<span
						className="btn-reply"
						onClick={() => setShowForm(true)}
					>
						Trả lời
					</span>
				)}
				<span className="text">{timeComment}</span>
			</div>
			{showForm && (
				<FormComment
					isReply={true}
					id={id}
					slug={slug}
					onClose={setShowForm}
					placeholder="Viết trả lời..."
					textSubmit="Trả lời"
				/>
			)}
		</>
	);
}

export default CommentControl;
