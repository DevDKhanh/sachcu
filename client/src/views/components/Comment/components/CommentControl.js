import React, { useState, useLayoutEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { HiDotsHorizontal } from 'react-icons/hi';

import { ProtectedComponent } from '../../../../utils/Protected';
import FormComment from '../../FormComment';
import CommentActions from './CommentActions';

function CommentControl(props) {
	const { isLogged, infoUser } = useSelector(state => state.user);
	const [showFormReply, setShowFormReply] = useState(false);
	const [showFormEdit, setShowFormEdit] = useState(false);
	const [showActions, setShowActions] = useState(false);

	/********** show comment reply when form comment reply show **********/
	useLayoutEffect(() => {
		if (showFormEdit) {
			setShowFormReply(false);
		}
	}, [showFormEdit]);

	const handleShowformReply = () => {
		setShowFormReply(true);
		props.onSetShowReply(true);
		setShowFormEdit(false);
	};

	return (
		<>
			<div className="control">
				<ProtectedComponent dependency={isLogged && !props.isReply}>
					<span className="btn-reply" onClick={handleShowformReply}>
						Trả lời
					</span>
				</ProtectedComponent>
				<span className="text">{props.timeComment}</span>
				<ProtectedComponent
					dependency={isLogged && props.idUser === infoUser.idUser}
				>
					<span className="text actions">
						<span
							role="button"
							className="btn--actions"
							onClick={() => setShowActions(!showActions)}
						>
							<HiDotsHorizontal />
						</span>
						<ProtectedComponent dependency={showActions}>
							<CommentActions
								isReply={props.isReply}
								id={props.id}
								onClose={setShowActions}
								onForm={setShowFormEdit}
							/>
						</ProtectedComponent>
					</span>
				</ProtectedComponent>
			</div>
			{showFormReply && (
				<FormComment
					isReply={true}
					isStyleReply={true}
					id={props.id}
					slug={props.slug}
					onClose={setShowFormReply}
					placeholder="Viết trả lời..."
					textSubmit="Trả lời"
				/>
			)}
			{showFormEdit && (
				<FormComment
					isReply={props.isReply}
					isStyleReply={true}
					isEdit={true}
					id={props.id}
					valueCurrent={props.content}
					slug={props.slug}
					onClose={setShowFormEdit}
					textSubmit="Sửa"
				/>
			)}
		</>
	);
}

export default memo(CommentControl);
