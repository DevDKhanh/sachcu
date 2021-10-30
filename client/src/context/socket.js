import React from 'react';

import socketio from 'socket.io-client';
import { SOCKET_URL } from '../constant/config';

export const socket = token =>
	socketio.connect(SOCKET_URL, {
		auth: {
			token: token,
		},
	});
export const SocketContext = React.createContext();
