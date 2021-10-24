import React from 'react';
import { BsClockHistory } from 'react-icons/bs';

import Rating from '../../../components/Rating';

function InfoPost() {
	return (
		<div className="info-post">
			<div className="info-post__user">
				<div className="avatar">
					<img
						src="https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-9/169121906_1673758642825329_1633927339019676240_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rrevtIymj6QAX_xoVTn&_nc_ht=scontent.fhan3-4.fna&oh=f60ee5853c8c2af7bd7378fd29d5f358&oe=61983826"
						alt="avatar"
					/>
				</div>
				<div className="text">
					<div className="name-user">Duy Khánh</div>
					<div className="time">
						<BsClockHistory /> 11 phút trước
					</div>
				</div>
			</div>
			<div className="info-post__text">Thể loại: Văn học</div>
			<div className="info-post__text">Tác giả: Duy Khánh</div>
			<div className="info-post__content">
				Mình đang thừa 1 quyển cần pass lại cho ai cần
			</div>
			<div className="info-post__contact">
				<a
					className="btn btn-contact-z"
					target="_blank"
					rel="noopener noreferrer"
					href={`https://zalo.me/${'0973551247'}`}
				>
					Liên hệ
				</a>
			</div>
			<div className="info-post__rating">
				<Rating />
				<span className="btn-rating">Đánh giá</span>
			</div>
		</div>
	);
}

export default InfoPost;
