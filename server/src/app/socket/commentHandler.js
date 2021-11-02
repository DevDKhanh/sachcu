require('dotenv').config();
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

const dbComments = require('../model/comments');
const dbPosts = require('../model/posts');
const dbCommentsReply = require('../model/replyComment');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

module.exports = (io, socket) => {
	const createComment = async ({ slug, comment }) => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			const isPost = await dbPosts.findOne({ slug: slug });
			if (user && socket.idUser && isPost) {
				if (slug && comment) {
					const newComment = new dbComments({
						idUser: socket.idUser,
						slug,
						comment: xss(comment),
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

	const deleteComment = async ({ id }) => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			const isComment = await dbComments.findOne({
				_id: id,
				idUser: user.data.idUser,
			});

			if (user && socket.idUser && isComment) {
				if (id) {
					await dbComments.deleteOne({
						_id: id,
						idUser: user.data.idUser,
					});
					dbCommentsReply.deleteMany({
						idComment: id,
					});
					socket.emit('comment:deleteSuccess', id);
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
	socket.on('comment:delete', deleteComment);
};
