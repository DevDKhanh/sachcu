require('dotenv').config();
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

const dbComments = require('../model/comments');
const dbCommentsReply = require('../model/replyComment');
const dbPosts = require('../model/posts');
const dbMessages = require('../model/message');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

module.exports = (io, socket) => {
	const messageAccpetPost = async ({ idUser, slug, title }) => {
		try {
			const msg = 'Bài viết của bạn đã được quản trị viên chấp thuận';
			const newMessages = new dbMessages({
				idUser,
				slug,
				title,
				type: 'post',
				message: msg,
				style: 'accpet',
			});

			const saveMessage = await newMessages.save();
			io.sockets.in(idUser).emit('message:send', { data: saveMessage });
		} catch (err) {
			socket.emit('msg', {
				text: 'Không thể gửi tin tới người dùng này',
			});
		}
	};
	socket.on('message:accpectPost', messageAccpetPost);
};
