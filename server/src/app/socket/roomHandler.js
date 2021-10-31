require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (io, socket) => {
	const joinRoom = async ({ slug, isReply, limit }) => {
		const token = socket.handshake.auth.token;
		const user = await jwt.verify(token, process.env.JWT_SECRET);
		if (user) {
			socket.join(slug);
		} else {
			socket.emit('msg', {
				text: 'Vui lòng đăng nhập',
			});
		}
	};

	const leaveRoom = async ({ slug }) => {
		const token = socket.handshake.auth.token;
		const user = await jwt.verify(token, process.env.JWT_SECRET);
		if (user) {
			socket.leave(slug);
		} else {
			socket.emit('msg', {
				text: 'Vui lòng đăng nhập',
			});
		}
	};

	socket.on('room:join', joinRoom);
	socket.on('room:leave', leaveRoom);
};
