import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HiDotsHorizontal } from 'react-icons/hi';

import { ProtectedComponent } from '../../../../utils/Protected';
import FormComment from '../../FormComment/index';
import '../style/commentControl.scss';

function CommentControl({ isReply, timeComment, id, slug, onSetShowReply }) {
	const { isLogged } = useSelector(state => state.user);
	const [showForm, setShowForm] = useState(false);

	/********** show comment reply when form comment reply show **********/
	useEffect(() => {
		if (showForm) {
			onSetShowReply(true);
		}
	}, [showForm, onSetShowReply]);

	return (
		<>
			<div className="control">
				<ProtectedComponent dependency={isLogged && !isReply}>
					<span
						className="btn-reply"
						onClick={() => setShowForm(true)}
					>
						Trả lời
					</span>
				</ProtectedComponent>
				<span className="text">{timeComment}</span>
				<ProtectedComponent dependency={isLogged && !isReply}>
					<span role="button" className="btn--actions text">
						<HiDotsHorizontal />
					</span>
				</ProtectedComponent>
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
