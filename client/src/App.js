import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routers from './routes';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/app.scss';
function App() {
	return (
		<React.Fragment>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
			/>
			<Router>
				<Header />
				<Routers />
				<Footer />
			</Router>
		</React.Fragment>
	);
}

export default App;
