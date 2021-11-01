import React, { useState, memo } from 'react';
import { BsStarFill } from 'react-icons/bs';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from 'react-toastify';

import { useCancelToken } from '../../../hooks';
import postAPI from '../../../api/postAPI';
import './style/style.scss';

function FormRating({ onClose, idUser, slug }) {
	const [star, setStar] = useState(0);
	const [isSubmit, setItSubmit] = useState(false);
	const { newCancelToken } = useCancelToken();

	const handleSelectStar = numStar => {
		setStar(numStar);
	};

	/********** update rating for post**********/
	const handleSubmitRating = () => {
		if (star > 0 && star <= 5) {
			setItSubmit(true);
			(async () => {
				try {
					const data = {
						star,
						idUser,
						slug,
					};
					const res = await postAPI.postReviews(
						data,
						newCancelToken(),
					);
					if (res.status === 1) {
						toast.success(res.message_vn);
						onClose(false);
					} else {
						toast.info(res.message_vn);
						onClose(false);
					}
				} catch (err) {
					toast.error('Server quá tải thử lại sau');
					onClose(false);
				}
			})();
		}
	};

	const handleClose = () => {
		if (!isSubmit) {
			onClose(false);
		}
	};

	return (
		<React.Fragment>
			<div className="overlay" onClick={handleClose}></div>
			<div className="form-rating">
				<LoadingOverlay text="Gửi đánh giá..." active={isSubmit}>
					<span id="from-rating">
						<div className="title">
							Bạn đánh giá bài đăng này thế nào?
						</div>
						<div className={`select-star choice-${star}`}>
							<span
								className="star"
								onMouseOver={() => handleSelectStar(1)}
							>
								<BsStarFill />
							</span>
							<span
								className="star"
								onMouseOver={() => handleSelectStar(2)}
							>
								<BsStarFill />
							</span>
							<span
								className="star"
								onMouseOver={() => handleSelectStar(3)}
							>
								<BsStarFill />
							</span>
							<span
								className="star"
								onMouseOver={() => handleSelectStar(4)}
							>
								<BsStarFill />
							</span>
							<span
								className="star"
								onMouseOver={() => handleSelectStar(5)}
							>
								<BsStarFill />
							</span>
						</div>
						<div className="group-btn">
							<button
								className="btn btn--secondary btn--round"
								onClick={handleClose}
							>
								Hủy
							</button>
							<button
								onClick={handleSubmitRating}
								className={`btn ${
									star > 0 ? 'btn--primary' : 'btn--no-drop'
								} btn--round`}
							>
								Đồng ý
							</button>
						</div>
					</span>
				</LoadingOverlay>
			</div>
		</React.Fragment>
	);
}

export default memo(FormRating);
