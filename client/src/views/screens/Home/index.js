import { memo, useState, useLayoutEffect } from 'react';

import ListPost from '../../components/ListPost';
import postAPI from '../../../api/postAPI';
import MenuCategory from '../../components/MenuCategory';

function HomePage() {
	const [isEmpty, setIsEmpty] = useState(false);

	useLayoutEffect(() => {
		(async () => {
			const res = await postAPI.countPosts();
			if (!res.data) {
				setIsEmpty(true);
			}
		})();
	}, []);

	return (
		<div className="page-main">
			<div className="grid wide">
				<div className="row">
					<div className="col l-3">
						<MenuCategory />
					</div>
					<div className="col l-9">
						<ListPost title="Mới nhất" limit={4} />
						<ListPost title="Công nghệ thông tin" category="cntt" />
						<ListPost title="Sách văn" category="van" />
						<ListPost title="Sách Toán" category="toan" />
						{isEmpty && <h1>Không có bài viết nào</h1>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(HomePage);
