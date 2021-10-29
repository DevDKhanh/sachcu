import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import postAPI from '../../../api/postAPI';
import ListSuggest from './components/ListSuggest';
import InfoPost from './components/InfoPost';
import PreviewPost from './components/PreviewPost';
import Comment from '../../components/Comment';
import FormComment from '../../components/FormComment';
import './style/style.scss';

function PostPage() {
	const history = useHistory();
	const { slug } = useParams();
	const [post, setPost] = useState({});
	const [posts, setPosts] = useState([]);

	//=====< get posts suggest >=====
	useEffect(() => {
		(async () => {
			const res = await postAPI.getPosts(post.category, 3);
			if (res.data) {
				let count = 0;
				const filter = [...res.data].filter(value => {
					if (value._id !== post._id && count < 2) {
						count++;
						return value;
					}
					return null;
				});
				setPosts(filter);
			}
		})();

		return () => setPosts([]);
	}, [post.category, post._id]);

	//=====< get data this post >=====
	useLayoutEffect(() => {
		window.scroll(0, 0);
		(async () => {
			try {
				const res = await postAPI.getPost(slug);
				if (res.status === 1) {
					setPost(res.data);
				} else {
					toast.info('Không tìm thấy bài viết');
					history.push('/');
				}
			} catch (err) {
				toast.error('Đã xảy ra lỗi');
				history.push('/');
			}
		})();

		return () => setPost({});
	}, [slug, history]);

	return (
		<div className="page-main">
			<div className="grid wide">
				<div className="main-post">
					<div className="row">
						<div className="col l-9">
							<div className="row">
								<div className="col l-7">
									<InfoPost post={post} />
								</div>
								<div className="col l-5">
									<PreviewPost
										title={post.title}
										img={post.image}
									/>
								</div>
							</div>
							<div className="comment">
								<FormComment />
								<Comment />
								<Comment />
								<Comment />
							</div>
						</div>
						<div className="col l-3">
							<ListSuggest
								count={posts.length}
								posts={posts}
								category={post.category}
								title="Gợi ý"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostPage;
