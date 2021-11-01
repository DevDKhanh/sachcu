import ListPost from '../../components/ListPost';

function HomePage() {
	return (
		<div className="page-main">
			<div className="grid wide">
				<ListPost title="Mới nhất" limit={4} />
				<ListPost title="Công nghệ thông tin" category="cntt" />
				<ListPost title="Sách văn" category="van" />
				<ListPost title="Sách Toán" category="toan" />
			</div>
		</div>
	);
}

export default HomePage;
