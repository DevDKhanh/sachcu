import React, { useState } from 'react';

import AvatarImg from '../../AvatarImg';
import BellNotify from '../../BellNotify';
import TabMenu from '../../TabMenu';

function MeControl({ user }) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<React.Fragment>
			<div className="nav-control">
				<div className="item">
					<BellNotify />
				</div>
				<div className="item" onClick={() => setShowMenu(true)}>
					<AvatarImg avatar={user.avatar || ''} />
				</div>
			</div>
			<TabMenu isShow={showMenu} onShow={setShowMenu} user={user} />
		</React.Fragment>
	);
}

export default MeControl;
