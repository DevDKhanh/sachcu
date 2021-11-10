import { memo } from 'react';

import './style/style.scss';

function Dialog({
	active,
	onClose,
	onSubmit,
	title,
	styleDialog,
	txtBtnSubmit,
}) {
	return (
		<>
			{active && (
				<>
					<div className="overlay" onClick={onClose}></div>
					<div className="dialog" role="alertdialog">
						<div className="dialog-title">{title}</div>
						<div className="dialog-actions">
							<button
								onClick={onClose}
								className="btn btn--secondary btn--round"
							>
								Hủy
							</button>
							<button
								onClick={onSubmit}
								className={`btn btn--${styleDialog} btn--round`}
							>
								{txtBtnSubmit}
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default memo(Dialog);
