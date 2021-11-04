import { memo } from 'react';

function HeadTable({ list = [] }) {
	return (
		<thead>
			<tr>
				{list.map((item, index) => (
					<th key={index}>{item}</th>
				))}
			</tr>
		</thead>
	);
}

export default memo(HeadTable);
