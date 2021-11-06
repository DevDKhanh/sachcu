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
			const msg = 'Bài viết của bạn đã được phê duyệt';
			const newMessages = new dbMessages({
				idUser,
				slug,
				title,
				type: 'post',
				message: msg,
				style: 'accpet',
			});

			const saveMessage = await newMessages.save();

			const countMessageNotRead = await dbMessages.countDocuments({
				type: 'post',
				idUser,
				read: 0,
			});

			io.sockets.in(idUser).emit('message:count', countMessageNotRead);
			io.sockets.in(idUser).emit('message:send', { data: saveMessage });
		} catch (err) {
			socket.emit('msg', {
				text: 'Không thể gửi tin tới người dùng này',
			});
		}
	};

	const messageNotAccpetPost = async ({ idUser, slug, title, content }) => {
		try {
			const msg = 'Bài viết của bạn đã bị từ chối';
			const newMessages = new dbMessages({
				idUser,
				slug,
				title,
				type: 'post',
				content: xss(content),
				message: msg,
				style: 'not-accpet',
			});

			const saveMessage = await newMessages.save();

			const countMessageNotRead = await dbMessages.countDocuments({
				type: 'post',
				idUser,
				read: 0,
			});

			await dbPosts.deleteOne({ slug, idUser });

			io.sockets.in(idUser).emit('message:count', countMessageNotRead);
			io.sockets.in(idUser).emit('message:send', { data: saveMessage });
		} catch (err) {
			socket.emit('msg', {
				text: 'Không thể gửi tin tới người dùng này',
			});
		}
	};

	const readMessage = async ({ id, type, readAll }) => {
		try {
			if (readAll) {
				await dbMessages.updateMany(
					{ type, idUser: socket.idUser },
					{ read: 1 },
				);
			} else {
				await dbMessages.updateOne(
					{ _id: id, type, idUser: socket.idUser },
					{ read: 1 },
				);
			}

			if (type === 'post') {
				const countMessageNotRead = await dbMessages.countDocuments({
					type,
					idUser: socket.idUser,
					read: 0,
				});
				socket.emit('message:count', countMessageNotRead);
			}
		} catch (err) {
			socket.emit('msg', {
				text: 'Có lỗi đã xảy ra',
			});
		}
	};

	socket.on('message:accpectPost', messageAccpetPost);
	socket.on('message:notAccpectPost', messageNotAccpetPost);
	socket.on('message:read', readMessage);
};
