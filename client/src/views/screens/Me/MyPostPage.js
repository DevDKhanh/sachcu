import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import './style/style.scss';

function MyPostPage() {
	return (
		<LoadingOverlay active={false} spinner text="Đang xử lí...">
			<div className="page-main">
				<div className="grid wide">
					<h1>My - post</h1>
				</div>
			</div>
		</LoadingOverlay>
	);
}

export default MyPostPage;
