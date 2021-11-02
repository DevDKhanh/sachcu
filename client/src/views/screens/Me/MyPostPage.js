import React from 'react';
import { NavLink } from 'react-router-dom';

import ListPost from '../../components/ListPost';
import LoadingOverlay from 'react-loading-overlay';
import './style/style.scss';

function MyPostPage() {
	return (
		<LoadingOverlay active={false} spinner text="Đang xử lí...">
			<div className="page-main">
				<div className="grid wide">
					<ListPost
						title="Bài đăng của tôi"
						limit={4}
						myPage={true}
						seemore={false}
						showMsg={true}
					>
						<div className="msg-my-page">
							<h2>Bạn chưa có bài đăng nào!!</h2>
							<NavLink
								to="/me/add-post"
								className="btn btn--primary"
							>
								Đăng bài Ngay
							</NavLink>
						</div>
					</ListPost>
				</div>
			</div>
		</LoadingOverlay>
	);
}

export default MyPostPage;
