import { memo } from 'react';

import TableShowPost from './components/TableShowPost';
import TablePostCensorship from './components/TablePostCensorship';
import './style/table.scss';

function DashboardPosts() {
	return (
		<div className="page-main">
			<div className="grid wide">
				<TablePostCensorship />
				<br />
				<br />
				<br />
				<TableShowPost />
			</div>
		</div>
	);
}

export default memo(DashboardPosts);
