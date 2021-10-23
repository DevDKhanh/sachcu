import React from 'react';

import { BsStarFill, BsStar } from 'react-icons/bs';

function Rating() {
	return (
		<span className="rating">
			<span className="star">
				<BsStarFill />
			</span>
			<span className="star">
				<BsStarFill />
			</span>
			<span className="star">
				<BsStarFill />
			</span>
			<span className="star">
				<BsStarFill />
			</span>
			<span className="star">
				<BsStar />
			</span>
		</span>
	);
}

export default Rating;
