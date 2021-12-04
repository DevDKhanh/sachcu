require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (io, socket) => {
	const newPost = async () => {
		io.emit('post:new');
	};

	socket.on('post:newSuccess', newPost);
};
