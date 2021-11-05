import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

import { useCancelToken } from '../../../hooks';
import meAPI from '../../../api/meAPI';
import listCategory from '../../../constant/listCategory';
import InputText from './components/InputText';
import InputSelect from './components/InputSelect';
import ContentEditable from 'react-contenteditable';
import {
	disableNewlines,
	pasteAsPlainText,
	trimSpaces,
} from '../../../utils/handleContentEditable';
import './style/style.scss';

function AddPostPage() {
	const { newCancelToken } = useCancelToken();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(null);
	const [dataForm, setDataForm] = useState({
		title: '',
		author: '',
		category: '',
		content: '',
		file: '',
	});

	const handleChange = e => {
		const key = e.target.name;
		const value = e.target.value;
		setDataForm(prev => ({ ...prev, [key]: value }));
	};

	const handleChangeContent = e => {
		const content = e.target.value;
		setDataForm({ ...dataForm, content: content });
	};

	const handleSelectImg = e => {
		const file = e.target.files[0];
		const maxSize = 8; //MB
		if (file.size / 1000000 > maxSize) {
			toast.warning(`Kích thước tối đa của ảnh là ${maxSize} mb`);
		} else if (
			file.type !== 'image/jpeg' &&
			file.type !== 'image/jpg' &&
			file.type !== 'image/png'
		) {
			toast.warning(
				`Định dạng tệp không chính xác, đuôi tệp chấp nhận jpg, jpeg, png`,
			);
		} else {
			setPreview(URL.createObjectURL(file));
			setDataForm(prev => ({ ...prev, file: file }));
		}
	};

	const handleColsed = () => {
		setPreview(null);
		setDataForm(prev => ({ ...prev, file: '' }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		const { title, author, content, file, category } = dataForm;
		if (title && author && content && file && category) {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('author', author);
			formData.append('content', trimSpaces(content));
			formData.append('file', file);
			formData.append('category', category);
			(async () => {
				try {
					const res = await meAPI.addPost(formData, newCancelToken());
					setLoading(false);
					if (res.status === 1) {
						history.push(`/me/my-post`);
						toast.success(res.message_vn);
					} else {
						toast.error(res.message_vn);
					}
				} catch (err) {
					console.log(err);
					toast.error('Thử lại sau ít phút');
					setLoading(false);
				}
			})();
		} else {
			setLoading(false);
			toast.warn('Nhập và lựa chọn đầy đủ các mục');
		}
	};

	return (
		<LoadingOverlay active={loading} spinner text="Đang xử lí...">
			<div className="page-main">
				<div className="grid wide">
					<div className="row">
						<div className="col l-8 m-12 c-12 l-o-2">
							<form onSubmit={handleSubmit} className="form-add">
								<h1 className="title">Đăng tin mới</h1>
								<div className="row">
									<div className="col l-7 m-7 c-7">
										<InputText
											name="title"
											label="Tên bài đăng"
											placeholder="VD: Sách tiếng anh"
											handleChange={handleChange}
										/>
										<InputText
											name="author"
											label="Tác giả sách-NXB"
											placeholder="VD: NXB Thanh niên"
											handleChange={handleChange}
										/>
										<InputSelect
											name="category"
											label="Thể loại"
											options={listCategory}
											handleChange={handleChange}
										/>
										<div className={`form-group`}>
											<label>Nội dung</label>
											<ContentEditable
												html={dataForm['content']}
												onChange={handleChangeContent}
												onKeyPress={disableNewlines}
												onPaste={pasteAsPlainText}
												tagName="div"
												role="textbox"
												className="input-element"
												placeholder="Nội dung bài viết..."
											/>
										</div>
									</div>
									<div className="col l-5 m-5 c-5">
										<div className="select-preview">
											{preview ? (
												<div
													className="closed-img"
													onClick={handleColsed}
												>
													<FaTimes />
												</div>
											) : (
												<label
													htmlFor="select-img"
													className="select-img"
												>
													Chọn ảnh
													<input
														hidden
														onChange={
															handleSelectImg
														}
														onClick={e => {
															e.target.value =
																null;
														}}
														type="file"
														name="file"
														id="select-img"
													/>
												</label>
											)}
											{preview && (
												<img
													className="preview"
													src={preview}
													alt="preview"
												/>
											)}
										</div>
									</div>
								</div>
								<div className="group-btn">
									<button className="btn btn--o-primary">
										Đăng bài
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</LoadingOverlay>
	);
}

export default AddPostPage;
