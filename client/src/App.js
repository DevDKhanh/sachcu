import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routers from './routes';

import { SocketContext, socket } from './context/socket';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './style/app.scss';

function App() {
	const { token } = useSelector(state => state.user);

	return (
		<SocketContext.Provider value={socket(token)}>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
			/>
			<Router>
				<Header />
				<Routers />
				<Footer />
			</Router>
		</SocketContext.Provider>
	);
}

export default App;
