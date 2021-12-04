import { memo, useEffect, useState, useCallback, useContext } from 'react';

import adminAPI from '../../../../api/adminAPI';
import { SocketContext } from '../../../../context/socket';
import { useCancelToken } from '../../../../hooks';
import InfoPost from './InfoPost';
import HeadTable from './HeadTable';
import Pagination from '../../../components/Pagination';

function TableShowPost() {
	const socket = useContext(SocketContext);
	const limit = 10;
	const { newCancelToken } = useCancelToken();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [countPosts, setCountPosts] = useState(0);

	const handleCallApi = useCallback(() => {
		(async () => {
			const res = await adminAPI.getPosts(limit, page, newCancelToken());
			if (res) {
				setPosts([...res.data]);
				setCountPosts(res.count);
			}
		})();
	}, [newCancelToken, page]);

	const handleDeletePost = useCallback(id => {
		setPosts(prev => prev.filter(post => post._id !== id));
	}, []);

	const listTitle = [
		'',
		'Tên',
		'Tên sách',
		'Thể loại',
		'Tác giả',
		'Trạng thái',
		'Ngày đăng',
		'Ẩn - Hiện',
		'',
	];

	useEffect(() => {
		socket.on('post:new', () => {
			console.log('ok');
			handleCallApi();
		});
	}, [socket, handleCallApi]);

	useEffect(() => {
		handleCallApi();
	}, [handleCallApi]);

	return (
		<div className="list-post">
			<button className="btn btn--primary" onClick={handleCallApi}>
				Tải mới
			</button>
			<h2>Danh sách tất cả bài viết</h2>
			<table className="table">
				<HeadTable list={listTitle} />
				<tbody>
					{posts.map(post => (
						<InfoPost
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
