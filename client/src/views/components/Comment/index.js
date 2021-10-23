import React from 'react';
// import { BsFlagFill } from 'react-icons/bs';

import './style/style.scss';

function Comment() {
	return (
		<div className="comment-item">
			<div className="comment-context">
				<div className="avatar">
					<img
						src="https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-9/169121906_1673758642825329_1633927339019676240_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rrevtIymj6QAX_xoVTn&_nc_ht=scontent.fhan3-4.fna&oh=f60ee5853c8c2af7bd7378fd29d5f358&oe=61983826"
						alt="avatar"
					/>
				</div>
				<div className="content">
					<div className="content-group">
						<div className="name-user">Duy Khanh</div>
						<div className="text-content">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Est vitae modi deserunt illum animi maxime
							deleniti facere aut corporis accusamus, veritatis
							suscipit quo voluptates amet sequi magnam quidem
							voluptatem distinctio.
						</div>
					</div>
					<div className="control">
						<span className="btn-reply">Trả lời</span>
						<span className="text">5 ngày trước</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comment;
