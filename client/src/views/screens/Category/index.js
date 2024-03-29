import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router';

import MenuCategory from '../../components/MenuCategory';
import listCategory from '../../../constant/listCategory';
import ListPost from '../../components/ListPost';

function CategoryPage() {
	const [category, setCategory] = useState();
	const { role } = useParams();

	useLayoutEffect(() => {
		if (role) {
			setCategory(...listCategory.filter(item => item.value === role));
		}
		return () => setCategory({});
	}, [role]);

	return (
		<div className="page-main">
			<div className="grid wide">
				<h2>{category?.text || 'Tất cả bài viết'}</h2>
				<div className="row">
					<div className="col l-3">
						<MenuCategory />
					</div>
					<div className="col l-9">
						<ListPost
							title={
								category ? `Sách ${category.text}` : 'Mới nhất'
							}
							category={role}
							limit={4}
							seemore={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryPage;
