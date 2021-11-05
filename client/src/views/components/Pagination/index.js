import { memo, useMemo } from 'react';

import './style/style.scss';

function Pagination({ count, limit, onPage, numPage }) {
	const list = useMemo(() => {
		let page = [];
		for (let i = 0; i < Math.ceil(count / limit); i++) {
			page.push(
				<li
					key={i}
					className={`${numPage === i + 1 && 'active'} item`}
					onClick={() => onPage(i + 1)}
				>
					{i + 1}
				</li>,
			);
		}
		return page;
	}, [count, limit, onPage, numPage]);

	return (
		<div className="pagination">
			<ul className="list">{list}</ul>
		</div>
	);
}

export default memo(Pagination);
