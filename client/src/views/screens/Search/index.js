import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import postAPI from '../../../api/postAPI';
import CardPost from '../../components/CardPost';

function SearchPage() {
	const limit = 12;
	const location = useLocation();
	const [page] = useState(1);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await postAPI.search({
				query: location.search,
				limit,
				page,
			});
			if (res.status === 1) {
				setPosts(res.data);
			}
		})();
	}, [location, page]);

	return (
		<div className="page-main">
			<div className="grid wide">
				<div className="list-posts">
					<div className="list-posts-header">
						<div className="title">Kết quả tìm kiếm</div>
					</div>
					{posts.length <= 0 && <h2>Không có kết quả nào phù hợp</h2>}
					<div className="list-posts-show">
						{posts.map(post => (
							<CardPost key={post._id} data={post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(SearchPage);
