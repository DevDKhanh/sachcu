require('dotenv').config();
const jwt = require('jsonwebtoken');

const registerCommentHandlers = require('./commentHandler');
const registerRoomHandlers = require('./roomHandler');

module.exports.start = io => {
	io.on('connection', async socket => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (user) {
				socket.idUser = user.data.idUser;
				socket.join(socket.idUser);
				registerCommentHandlers(io, socket);
				registerRoomHandlers(io, socket);
			}
		} catch (err) {
			socket.emit('error');
		}
	});
};
