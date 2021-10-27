import React, { useState } from 'react';

import PlaceHolderUser from '../../../../assets/images/user-placeholder-image.jpg';
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
					<div className="avatar">
						<img
							onError={e => {
								e.target.onerror = null;
								e.target.src = PlaceHolderUser;
							}}
							src=""
							alt=""
						/>
					</div>
				</div>
			</div>
			<TabMenu isShow={showMenu} onShow={setShowMenu} user={user} />
		</React.Fragment>
	);
}

export default MeControl;
