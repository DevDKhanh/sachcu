import React from 'react';

function PreviewPost({ title, img }) {
	return (
		<div className="preview-post">
			<h1 className="title">{title}</h1>
			<div className="image">
				<img src={img} alt="post" />
			</div>
		</div>
	);
}

export default PreviewPost;
