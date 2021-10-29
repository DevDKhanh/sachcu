import React from 'react';

function Title({ children }) {
	return (
		<h4
			dangerouslySetInnerHTML={{ __html: children }}
			className="card-info__title"
		></h4>
	);
}

export default Title;
