require('dotenv').config();
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

const dbCommentsReply = require('../model/replyComment');
const dbComments = require('../model/comments');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

module.exports = (io, socket) => {
	const createCommentReply = async ({ idComment, comment, slug }) => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			const isComment = await dbComments.findOne({ _id: idComment });

			if (user && socket.idUser && isComment) {
				if (idComment && comment) {
					const newCommentReply = new dbCommentsReply({
						idUser: socket.idUser,
						idComment,
						comment: xss(comment),
					});
					const saveCommentReply = await newCommentReply.save();
					const countCommentsReply =
						await dbCommentsReply.countDocuments({ idComment });
					if (saveCommentReply) {
						io.sockets.in(slug).emit('commentReply:successCreate', {
							data: saveCommentReply,
							idComment,
							count: countCommentsReply,
						});
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

	const deleteCommentReply = async ({ id }) => {
		try {
			const token = socket.handshake.auth.token;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			const isCommentReply = await dbCommentsReply.findOne({
				_id: id,
				idUser: user.data.idUser,
			});

			if (user && socket.idUser && isCommentReply) {
				if (id) {
					await dbCommentsReply.deleteOne({
						_id: id,
					});
					socket.emit('commentReply:deleteSuccess', id);
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

	socket.on('commentReply:create', createCommentReply);
	socket.on('commentReply:delete', deleteCommentReply);
};
