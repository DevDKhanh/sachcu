import { memo, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';

import { FaSearch } from 'react-icons/fa';
import { ProtectedComponent } from '../../../utils/Protected';
import './style/style.scss';

function Search() {
	const history = useHistory();
	const formRef = useRef();
	const [show, setShow] = useState(false);
	const [text, setText] = useState('');

	const handleSearch = e => {
		e.preventDefault();
		if (text.trim() !== '') {
			history.push(`/search?key=${text}`);
		}
	};

	useEffect(() => {
		const handleClick = e => {
			if (formRef.current && !formRef.current.contains(e.target)) {
				setShow(false);
			}
		};
		if (show) {
			document.addEventListener('click', handleClick);
		}
		return () => document.removeEventListener('click', handleClick);
	}, [formRef, setShow, show]);

	return (
		<>
			<button className="btn--search" onClick={() => setShow(!show)}>
				<FaSearch />
			</button>
			<ProtectedComponent dependency={show}>
				<form
					onSubmit={handleSearch}
					className="form-search"
					ref={formRef}
				>
					<input
						type="text"
						placeholder="Nhập từ tìm kiếm..."
						onChange={e => setText(e.target.value)}
					/>
					<div className="group-btn">
						<div
							className="btn btn--round btn--secondary"
							onClick={() => setShow(!show)}
						>
							Đóng
						</div>
						<button className="btn btn--round btn--primary">
							Tìm kiếm
						</button>
					</div>
				</form>
			</ProtectedComponent>
		</>
	);
}

export default memo(Search);
