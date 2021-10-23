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
			<div className="info-post__content">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
				odio at molestiae iusto corporis hic pariatur aperiam quod porro
				facilis eius cupiditate repudiandae reprehenderit tempora
				dolorem exercitationem quia, dignissimos asperiores?
			</div>
			<div className="info-post__rating">
				<Rating />
			</div>
		</div>
	);
}

export default InfoPost;
