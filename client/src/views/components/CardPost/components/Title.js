import LoadingPlaceHolder from '../../Effect/LoadingPlaceHolder';

function Title({ children }) {
	return (
		<h4 className="card-info__title">
			{children}
			<LoadingPlaceHolder dependency={!children} />
		</h4>
	);
}

export default Title;
