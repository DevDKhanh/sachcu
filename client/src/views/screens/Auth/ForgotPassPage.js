import { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import { ProtectedComponent } from '../../../utils/Protected';
import authAPI from '../../../api/authAPI';
import './style/forgotpass.scss';

function ForgotPassPage() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [content, setContet] = useState({ email: null, codeVerify: null });

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);

		if (step === 1) {
			if (content.email !== '') {
				(async () => {
					const res = await authAPI.sendMail(content);
					setLoading(false);
					if (res.status === 1) {
						toast.info('Mã xác nhận đã được gửi tới mail của bạn');
						setStep(2);
					} else {
						toast.info(res.msg);
					}
				})();
			} else {
				toast.warn('Vui lòng nhập email của bạn');
			}
		}

		if (step === 2) {
			if (content.codeVerify !== '' && content.pass !== '') {
				if (content.email !== '') {
					(async () => {
						const res = await authAPI.sendMail(content);
						setLoading(false);
						if (res.status === 1) {
							toast.success('Thay đổi mật khẩu thành công');
							history.push('/login');
							setStep(1);
						} else {
							toast.info(res.msg);
						}
					})();
				} else {
					toast.warn('Vui lòng nhập email của bạn');
				}
			} else {
				toast.warn('Vui lòng nhập mã xác nhận của bạn');
			}
		}
	};

	return (
		<LoadingOverlay active={loading} spinner text="Đang xử lí...">
			<div className="page-main">
				<div className="grid wide">
					<div className="forgotpass">
						<ProtectedComponent dependency={step === 2}>
							<form
								onSubmit={handleSubmit}
								className="form-gotpass"
							>
								<input
									type="text"
									className="input-element"
									onChange={e =>
										setContet(prev => ({
											...prev,
											codeVerify: e.target.value,
										}))
									}
									placeholder="Nhập mã xác nhận"
								/>
								<input
									type="password"
									className="input-element"
									onChange={e =>
										setContet(prev => ({
											...prev,
											pass: e.target.value,
										}))
									}
									placeholder="Nhập mật khẩu mới"
								/>
								<div className="group-btn">
									<button className="btn btn--round btn--root1">
										Đổi mật khẩu
									</button>
								</div>
							</form>
						</ProtectedComponent>
						<ProtectedComponent dependency={step === 1}>
							<form
								onSubmit={handleSubmit}
								className="form-gotpass"
							>
								<input
									type="text"
									className="input-element"
									onChange={e =>
										setContet(prev => ({
											...prev,
											email: e.target.value,
										}))
									}
									placeholder="Nhập tài khoản email của bạn"
								/>
								<div className="group-btn">
									<button className="btn btn--round btn--root1">
										Gửi mã xác nhận
									</button>
								</div>
							</form>
						</ProtectedComponent>
					</div>
				</div>
			</div>
		</LoadingOverlay>
	);
}

export default ForgotPassPage;
