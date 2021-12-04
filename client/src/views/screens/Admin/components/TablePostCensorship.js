import { memo, useEffect, useState, useCallback, useContext } from 'react';

import adminAPI from '../../../../api/adminAPI';
import { SocketContext } from '../../../../context/socket';
import { useCancelToken } from '../../../../hooks';
import InfoPostCensorship from './InfoPostCensorship';
import HeadTable from './HeadTable';
import Pagination from '../../../components/Pagination';

function TableShowPost() {
	const socket = useContext(SocketContext);
	const limit = 5;
	const { newCancelToken } = useCancelToken();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [countPosts, setCountPosts] = useState(0);

	const listTitle = [
		'',
		'Tên',
		'Tên sách',
		'Thể loại',
		'Tác giả',
		'Ngày đăng',
		'',
	];

	const handleCallApi = useCallback(() => {
		(async () => {
			const res = await adminAPI.getPostsCensorship(
				limit,
				page,
				newCancelToken(),
			);
			if (res) {
				setPosts([...res.data]);
				setCountPosts(res.count);
			}
		})();
	}, [newCancelToken, page]);

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
			<h2>Danh sách bài viết chưa được phê duyệt</h2>{' '}
			<table className="table">
				<HeadTable list={listTitle} />
				<tbody>
					{posts.map(post => (
						<InfoPostCensorship
							key={post._id}
							props={post}
							onSetPosts={setPosts}
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
