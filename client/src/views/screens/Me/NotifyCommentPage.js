import { memo, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

import meAPI from '../../../api/meAPI';
import CardMessage from './components/CardMessage';

function NotifyCommentPage() {
	const limit = 12;
	const listRef = useRef();
	const [page, setPage] = useState(1);
	const [list, setList] = useState([]);
	const [disabledLoad, setDisabledLoad] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await meAPI.getMessage({
					limit: limit,
					page: page,
					type: 'comment',
				});
				if (res.status === 1) {
					setList(prev => [...prev, ...res.data.messageList]);
					setLoading(false);
					if (limit * page >= res.data.countMessage) {
						setDisabledLoad(true);
					}
				}
			} catch (err) {
				toast.error('Đã xảy ra lỗi');
			}
		})();
	}, [page]);

	useEffect(() => {
		const handleScroll = () => {
			const screenHeight = window.innerHeight;
			const scrollTop = window.scrollY;
			const documentHeight = listRef.current?.clientHeight;

			if (scrollTop + screenHeight > documentHeight - 150) {
				if (!loading) {
					!disabledLoad && nextPage();
					setLoading(true);
				}
			}
		};

		const nextPage = () => {
			setPage(prev => prev + 1);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [disabledLoad, loading]);

	return (
		<div className="page-main">
			<div className="grid wide">
				<h1>Danh sách thông báo</h1>
				<div className="list-notify" ref={listRef}>
					{list.map(item => (
						<CardMessage key={item._id} message={item} />
					))}
				</div>
			</div>
		</div>
	);
}

export default memo(NotifyCommentPage);
