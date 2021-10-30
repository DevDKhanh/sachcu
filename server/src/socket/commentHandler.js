require('dotenv').config();
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

const dbComments = require('../controllers/model/comments');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

module.exports = (io, socket) => {
	const createComment = async ({ slug, comment }) => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (user && socket.idUser) {
				if (slug && comment) {
					const newComment = new dbComments({
						idUser: socket.idUser,
						slug,
						comment,
					});
					const saveComment = await newComment.save();
					if (saveComment) {
						io.sockets
							.in(slug)
							.emit('comment:successCreate', saveComment);
					} else {
						socket.emit('msg', {
							text: 'Không thể đăng bình luận',
						});
					}
				} else {
					socket.emit('msg', {
						text: 'Vui lòng thử lại sau',
					});
				}
			} else {
				socket.emit('msg', { text: 'Có lỗi đã xảy ra' });
			}
		} catch (err) {
			socket.emit('msg', { text: 'Có lỗi đã xảy ra' });
		}
	};

	socket.on('comment:create', createComment);
};
