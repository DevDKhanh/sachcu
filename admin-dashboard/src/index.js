import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import App from './App';
import CurrentUser from './utils/CurrentUser';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<CurrentUser>
			<App />
		</CurrentUser>
	</Provider>,
	document.getElementById('root'),
);

reportWebVitals();
