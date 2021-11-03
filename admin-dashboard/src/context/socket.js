import { createContext } from 'react';
import { useSelector } from 'react-redux';
import socketio from 'socket.io-client';

import { SOCKET_URL } from '../constant/config';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { token } = useSelector(state => state.user);
	const socket = socketio.connect(SOCKET_URL, {
		auth: {
			token: token,
		},
	});
	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};
