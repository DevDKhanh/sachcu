import { memo } from 'react';

import LoadingPlaceHolder from '../../Effect/LoadingPlaceHolder';

function CommentsText({ lastName = '', firstName = '', content = '' }) {
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

export default memo(CommentsText);
