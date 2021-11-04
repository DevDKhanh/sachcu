import { memo, useLayoutEffect, useState, useCallback } from 'react';

import adminAPI from '../../../../api/adminAPI';
import { useCancelToken } from '../../../../hooks';
import InfoPost from './InfoPost';
import HeadTable from './HeadTable';

function TableShowPost() {
	const { newCancelToken } = useCancelToken();
	const [posts, setPosts] = useState([]);

	useLayoutEffect(() => {
		(async () => {
			const data = await adminAPI.getPosts(newCancelToken());
			console.log(data);
			data && setPosts(data);
		})();
	}, [newCancelToken]);

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
		'Ẩn - Hiện',
		'',
	];
	return (
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
	);
}

export default memo(TableShowPost);
