import React, {
	useLayoutEffect,
	useEffect,
	useContext,
	useState,
	useCallback,
} from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../hooks';
import { SocketContext } from '../../../context/socket';
import { ProtectedComponent } from '../../../utils/Protected';
import LoadingData from '../../components/Effect/LoadingData';
import commentsAPI from '../../../api/commentsAPI';
import postAPI from '../../../api/postAPI';
import ListSuggest from '../../components/ListSuggest';
import InfoPost from '../../components/InfoPost';
import PreviewPost from '../../components/PreviewPost';
import ListComment from '../../components/ListComment';
import FormComment from '../../components/FormComment';
import './style/style.scss';

function PostPage() {
	const history = useHistory();
	const socket = useContext(SocketContext);
	const { slug } = useParams();
	const { newCancelToken } = useCancelToken();
	const [disabledLoadComment, setDisabledLoadComment] = useState(true);
	const [isLoad, setIsLoad] = useState(true);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [pageComment, setPageComment] = useState(1); // pagecomment is number comment's page ... default is 1 -> start page 1
	const [comments, setComments] = useState([]);
	const [post, setPost] = useState({});
	const [posts, setPosts] = useState([]);

	/********** handle connect room  **********/
	useEffect(() => {
		socket.emit('room:join', { slug });
		socket.on('msg', ({ text }) => {
			toast.error(text);
		});
		return () => {
			socket.off('msg');
			socket.off('room:join');
			socket.emit('room:leave', { slug });
		};
	}, [socket, slug]);

	/********** reset state when slug change **********/
	useEffect(() => {
		setComments([]);
		setPageComment(1);
		setPosts([]);
		setIsLoad(true);
		setDisabledLoadComment(true);
	}, [slug]);

	/********** get posts suggest **********/
	useEffect(() => {
		(async () => {
			const res = await postAPI.getPosts(
				post.category,
				3,
				1,
				newCancelToken(),
			);
			if (res && res.data) {
				let count = 0;

				//=====< Filter get 2 post >=====
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
	}, [post.category, post._id, newCancelToken]);

	/********** Call api get comment **********/
	useLayoutEffect(() => {
		(async () => {
			try {
				const limit = 3;
				const resComment = await commentsAPI.getCommentOfPage(
					slug,
					limit,
					false,
					pageComment,
					newCancelToken(),
				);
				if (resComment && resComment.data) {
					setIsLoadMore(false);
					setIsLoad(false);
					setComments(prev => [...prev, ...resComment.data]);
					if (pageComment * limit >= resComment.countComments) {
						setDisabledLoadComment(true);
					} else {
						setDisabledLoadComment(false);
					}
				}
			} catch (err) {}
		})();
	}, [slug, pageComment, newCancelToken]);

	/********** get this post data **********/
	useEffect(() => {
		(async () => {
			try {
				const resPost = await postAPI.getPost(slug, newCancelToken());
				if (resPost.status === 1) {
					setPost(resPost.data);
				} else {
					toast.info('Không tìm thấy bài viết');
					history.push('/');
				}
			} catch (err) {
				toast.error('Đã xảy ra lỗi');
				history.push('/');
			}
		})();

		return () => {
			setPost({});
		};
	}, [slug, history, newCancelToken]);

	/********** Update comments when there are new comments **********/
	useEffect(() => {
		socket.on('comment:successCreate', data => {
			setComments(prev => [data, ...prev]);
		});

		socket.on('comment:deleteSuccess', id => {
			setComments(prev => prev.filter(comment => comment._id !== id));
		});

		socket.on('comment:editSuccess', data => {
			setComments(prev =>
				prev.map(comment => {
					if (comment._id === data._id) {
						return data;
					} else {
						return comment;
					}
				}),
			);
		});

		return () => {
			socket.off('comment:successCreate');
			socket.off('comment:deleteSuccess');
			socket.off('comment:editSuccess');
		};
	}, [socket, slug]);

	const handleLoadMoreComment = useCallback(() => {
		if (!disabledLoadComment && !isLoadMore) {
			setIsLoadMore(true);
			setPageComment(prev => prev + 1);
		}
	}, [disabledLoadComment, isLoadMore]);

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
									title="Bình luận"
									slug={slug}
									placeholder="Viết bình luận của bạn"
								/>
								<LoadingData
									isLoad={isLoad}
									text="Đang tải bình luận..."
								/>
								<ProtectedComponent dependency={!isLoad}>
									<ListComment comments={comments} />
								</ProtectedComponent>
								<ProtectedComponent
									dependency={!disabledLoadComment}
								>
									<div
										role="button"
										onClick={handleLoadMoreComment}
										className="btn--load-more-comment"
									>
										<ProtectedComponent
											dependency={!isLoadMore}
										>
											Tải thêm bình luận{' '}
											<span className="icon">
												<RiArrowDropDownLine />
											</span>
										</ProtectedComponent>
										<LoadingData
											isLoad={isLoadMore}
											text="Tải thêm bình luận..."
										/>
									</div>
								</ProtectedComponent>
							</div>
						</div>
						<div className="col l-3">
							<ListSuggest
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
