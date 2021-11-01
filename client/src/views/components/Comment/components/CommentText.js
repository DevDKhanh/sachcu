import React from 'react';

import LoadingPlaceHolder from '../../Effect/LoadingPlaceHolder';
import '../style/commentText.scss';

function CommentText({ lastName, firstName, content }) {
	return (
		<div className="content-group">
			<div className="name-user">
				<LoadingPlaceHolder dependency={!lastName} />
				{`${lastName} ${firstName}`}
			</div>
			<div className="text-content">
				{content}
				<LoadingPlaceHolder dependency={!lastName} />
			</div>
		</div>
	);
}

export default CommentText;
