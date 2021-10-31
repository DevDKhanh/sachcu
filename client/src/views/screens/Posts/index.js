import React, { useLayoutEffect, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SocketContext } from '../../../context/socket';
import commentsAPI from '../../../api/commentsAPI';
import postAPI from '../../../api/postAPI';
import ListSuggest from './components/ListSuggest';
import InfoPost from './components/InfoPost';
import PreviewPost from './components/PreviewPost';
import ListComment from '../../components/ListComment';
import FormComment from '../../components/FormComment';
import './style/style.scss';

function PostPage() {
	const socket = useContext(SocketContext);
	const history = useHistory();
	const [comments, setComments] = useState([]);
	const { slug } = useParams();
	const [post, setPost] = useState({});
	const [posts, setPosts] = useState([]);

	//===== < handle connect room >=====
	useEffect(() => {
		socket.emit('room:join', { slug });
		return () => {
			socket.off('room:join');
			socket.emit('room:leave', { slug });
		};
	}, [socket, slug]);

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
				const [resPost, resComment] = await Promise.all([
					postAPI.getPost(slug),
					commentsAPI.getCommentOfPage(slug),
				]);
				if (resPost.status === 1) {
					setPost(resPost.data);
				} else {
					toast.info('Không tìm thấy bài viết');
					history.push('/');
				}

				if (resComment.data) {
					setComments([...resComment.data]);
				}
			} catch (err) {
				toast.error('Đã xảy ra lỗi');
				history.push('/');
			}
		})();

		return () => {
			setComments([]);
			setPost({});
		};
	}, [slug, history]);

	useEffect(() => {
		socket.on('comment:successCreate', data => {
			setComments(prev => [data, ...prev]);
		});

		return () => {
			socket.off('comment:successCreate');
		};
	}, [socket, slug]);

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
								<FormComment
									slug={slug}
									placeholder="Viết bình luận của bạn"
								/>
								<ListComment comments={comments} />
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
