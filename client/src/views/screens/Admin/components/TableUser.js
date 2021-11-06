import { memo, useEffect, useState, useCallback } from 'react';

import adminAPI from '../../../../api/adminAPI';
import { useCancelToken } from '../../../../hooks';
import InfoUser from './InfoUser';
import HeadTable from './HeadTable';
import Pagination from '../../../components/Pagination';

function TableShowPost() {
	const limit = 10;
	const { newCancelToken } = useCancelToken();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [countPosts, setCountPosts] = useState(0);

	const handleCallApi = useCallback(() => {
		(async () => {
			const res = await adminAPI.getPosts(limit, page, newCancelToken());
			if (res) {
				setPosts(prev => [...res.data]);
				setCountPosts(prev => res.count);
			}
		})();
	}, [newCancelToken, page]);

	const handleDeletePost = useCallback(id => {
		setPosts(prev => prev.filter(post => post._id !== id));
	}, []);

	const listTitle = ['', 'Tên', 'Số điện thoại', 'email', 'Ngày đăng kí', ''];

	useEffect(() => {
		handleCallApi();
	}, [handleCallApi]);

	return (
		<div className="list-post">
			<button className="btn btn--primary" onClick={handleCallApi}>
				Tải mới
			</button>
			<h2>Danh sách tất cả người dùng</h2>
			<table className="table">
				<HeadTable list={listTitle} />
				<tbody>
					{posts.map(post => (
						<InfoUser
							key={post._id}
							props={post}
							onDeletePost={handleDeletePost}
						/>
					))}
				</tbody>
			</table>
			<Pagination
				count={countPosts}
				limit={limit}
				numPage={page}
				onPage={setPage}
			/>
		</div>
	);
}

export default memo(TableShowPost);
