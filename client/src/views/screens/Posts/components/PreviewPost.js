import React from 'react';

function PreviewPost() {
	return (
		<div className="preview-post">
			<div className="title">Sách toán cáo cấp</div>
			<div className="image">
				<img
					src="data:image/jpeg;base64,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"
					alt="post"
				/>
			</div>
		</div>
	);
}

export default PreviewPost;