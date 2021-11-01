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

import LoadingData from '../../components/Effect/LoadingData';
import { SocketContext } from '../../../context/socket';
import { ProtectedComponent } from '../../../utils/Protected';
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
	const { slug } = useParams();
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
		return () => {
			socket.off('room:join');
			socket.emit('room:leave', { slug });
		};
	}, [socket, slug]);

	useEffect(() => {
		window.scroll(0, 0);
		/********** reset state when slug change **********/
		setComments([]);
		setPageComment(1);
		setPosts([]);
		setIsLoad(true);
		setDisabledLoadComment(true);
	}, [slug]);

	/********** get posts suggest **********/
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
	}, [post.category, post._id]);

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
				);
				if (resComment.data) {
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
	}, [slug, pageComment]);

	/********** get this post data **********/
	useLayoutEffect(() => {
		(async () => {
			try {
				const resPost = await postAPI.getPost(slug);
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
	}, [slug, history]);

	/********** Update comments when there are new comments **********/
	useEffect(() => {
		socket.on('comment:successCreate', data => {
			setComments(prev => [data, ...prev]);
		});

		return () => {
			socket.off('comment:successCreate');
		};
	}, [socket, slug]);

	const handleLoadMoreComment = useCallback(() => {
		if (!disabledLoadComment) {
			setIsLoadMore(true);
			!isLoadMore && setPageComment(prev => prev + 1);
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
