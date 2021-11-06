import { memo } from 'react';

import TableUser from './components/TableUser';

function DashboardUsers() {
	return (
		<div className="page-main">
			<div className="grid wide">
				<TableUser />
			</div>
		</div>
	);
}

export default memo(DashboardUsers);
