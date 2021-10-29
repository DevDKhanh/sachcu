import { memo } from 'react';

import { BsStarFill, BsStar } from 'react-icons/bs';

function Rating({ star }) {
	const showStar = [];

	if (star) {
		for (let i = 0; i < 5; i++) {
			if (i < Math.round(star)) {
				showStar.push(
					<span key={i} className="star">
						<BsStarFill />
					</span>,
				);
			} else {
				showStar.push(
					<span key={i} className="star">
						<BsStar />
					</span>,
				);
			}
		}
	}

	return <span className="rating">{showStar}</span>;
}

export default memo(Rating);
