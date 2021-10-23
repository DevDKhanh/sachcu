import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routers from './routes';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import './style/app.scss';

function App() {
	return (
		<Router>
			<Header />
			<Routers />
			<Footer />
		</Router>
	);
}

export default App;
