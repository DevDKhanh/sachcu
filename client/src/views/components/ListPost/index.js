import React, { useEffect, useState, useRef, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { useCancelToken } from '../../../hooks';
import { ProtectedComponent } from '../../../utils/Protected';
import postAPI from '../../../api/postAPI';
import CardPost from '../CardPost';
import './style/style.scss';

function ListPost({
	title = 'Danh sách bài đăng',
	category = 'all',
	limit = 8,
	page = 1,
	myPage = false,
	seemore = true,
	showMsg = false,
	children,
}) {
	const [posts, setPosts] = useState([]);
	const [numberPage, setNumberPage] = useState(Number(page));
	const [disabledLoad, setDisabledLoad] = useState(false);
	const [loadData, setLoadData] = useState(true);
	const [loading, setLoading] = useState(false);
	const listRef = useRef();
	const { newCancelToken } = useCancelToken();

	/********** get all post **********/
	useEffect(() => {
		(async () => {
			try {
				//=====< call api >=====
				const res = await postAPI.getPosts(
					category,
					limit,
					numberPage,
					myPage,
					newCancelToken(),
				);
				if (res.data) {
					setPosts(prev => [...prev, ...res.data]);
					setLoading(false);
					setLoadData(false);
					if (limit * numberPage >= res.countPost) {
						setDisabledLoad(true);
					}
				}
			} catch (err) {}
		})();
	}, [category, limit, numberPage, myPage, newCancelToken]);

	useEffect(() => {
		if (!seemore) {
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
				setNumberPage(prev => prev + 1);
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, [seemore, disabledLoad, loading]);

	return (
		<React.Fragment>
			<ProtectedComponent dependency={posts.length > 0}>
				<div className="list-posts" ref={listRef}>
					<div className="list-posts-header">
						<div className="title">{title}</div>
						{seemore && (
							<NavLink to={`/category/${category}`}>
								Xem thêm
							</NavLink>
						)}
					</div>
					<div className="list-posts-show">
						{posts.map(post => (
							<CardPost key={post._id} data={post} />
						))}
					</div>
				</div>
			</ProtectedComponent>

			<ProtectedComponent dependency={loadData}>
				<div className="list-posts-show effect">
					{['', '', '', ''].map((post, index) => (
						<CardPost key={index} data={post} showStar={false} />
					))}
				</div>
			</ProtectedComponent>

			<ProtectedComponent
				dependency={showMsg && posts.length <= 0 && !loadData}
			>
				{children}
			</ProtectedComponent>
		</React.Fragment>
	);
}

export default memo(ListPost);
