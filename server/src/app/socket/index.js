require('dotenv').config();
const jwt = require('jsonwebtoken');

const registerCommentHandler = require('./commentHandler');
const registerCommentReplyHandler = require('./commentReplyHandler');
const registerRoomHandler = require('./roomHandler');
const registerMessageHandler = require('./messageHandler');

module.exports.start = io => {
	io.on('connection', async socket => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (user) {
				socket.idUser = user.data.idUser;
				socket.join(socket.idUser);
				registerCommentHandler(io, socket);
				registerRoomHandler(io, socket);
				registerCommentReplyHandler(io, socket);
				registerMessageHandler(io, socket);
			}
		} catch (err) {
			socket.emit('error');
		}
	});
};
