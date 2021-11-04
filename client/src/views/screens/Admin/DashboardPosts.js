import { memo } from 'react';

import TableShowPost from './components/TableShowPost';
import './style/table.scss';

function DashboardPosts() {
	return (
		<div className="page-main">
			<div className="grid wide">
				<TableShowPost />
			</div>
		</div>
	);
}

export default memo(DashboardPosts);
