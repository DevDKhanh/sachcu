import React from 'react';

import InfoPost from './components/InfoPost';
import PreviewPost from './components/PreviewPost';
import Comment from '../../components/Comment';
import './style/style.scss';

function PostPage() {
	return (
		<div className="page-main">
			<div className="grid wide">
				<div className="main-post">
					<div className="row">
						<div className="col l-9">
							<div className="row">
								<div className="col l-7">
									<InfoPost />
								</div>
								<div className="col l-5">
									<PreviewPost />
								</div>
							</div>
							<div className="comment">
								<Comment />
								<Comment />
								<Comment />
							</div>
						</div>
						<div className="col l-3 list-tag"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostPage;
