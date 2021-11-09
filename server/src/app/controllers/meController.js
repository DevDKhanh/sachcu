require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');
const dbMessage = require('../model/message');

const cloudinary = require('../../utils/cloudinary');
const validator = require('validator');
const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class MeController {
	//[POST] /api/v1/me/post
	async meAddPost(req, res, next) {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			const { title, content, author, category } = req.body;
			const fileImage = req.file;

			if (
				user &&
				title &&
				content &&
				author &&
				category &&
				fileImage.path
			) {
				//format img is jpeg, png, jpg
				if (
					fileImage.mimetype !== 'image/jpeg' &&
					fileImage.mimetype !== 'image/jpg' &&
					fileImage.mimetype !== 'image/png'
				) {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'Incorrect format',
						message_vn:
							'Định dạng không chính xác, chỉ chấp nhận jpeg, jpg, png',
					});
				}

				//size file(1mb = 1000000 byte) max 8mb
				if (fileImage.size / 1000000 > 8) {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'Max size file is 5MB',
						message_vn: 'Kích thước tối đa của ảnh là 5mb',
					});
				}

				const saveImg = await cloudinary.uploader.upload(
					fileImage.path,
				);
				const newPost = new dbPosts({
					idUser: user.data.idUser,
					title: xss(title),
					content: xss(content),
					author: xss(author),
					category: xss(category),
					image: saveImg.secure_url,
					idImage: saveImg.public_id,
				});

				const savePost = await newPost.save();

				return res.status(201).json({
					status: 1,
					code: 201,
					slug: savePost._doc.slug,
					message: 'Create successfully',
					message_vn: 'Tạo thành công, bài viết đang được kiểm duyệt',
				});
			} else {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Please enter full',
					message_vn: 'Nhập đầy đủ',
				});
			}
		} catch (err) {
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error',
			});
		}
	}

	//[PUT] /api/v1/me/status
	async updateStatus(req, res, next) {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			const { id, status } = req.body;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (!id) {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Not found id',
				});
			} else {
				const updateStatus = await dbPosts.updateOne(
					{ _id: id, idUser: user.data.idUser },
					{ status },
				);
				if (updateStatus) {
					return res.status(200).json({
						status: 1,
						code: 200,
						message: 'Update status successfully',
					});
				} else {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Not found data with this id',
					});
				}
			}
		} catch (err) {
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error server',
			});
		}
	}

	//[DELETE] /api/v1/me/post
	async deletePost(req, res, next) {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			const { id } = req.query;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (!id) {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Not found id',
				});
			} else {
				const deletePost = await dbPosts.updateOne(
					{ _id: id, idUser: user.data.idUser },
					{ isDelete: true },
				);
				if (deletePost) {
					return res.status(200).json({
						status: 1,
						code: 200,
						message: 'Delete post successfully',
					});
				} else {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Not found data with this id',
					});
				}
			}
		} catch (err) {
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error server',
			});
		}
	}

	async getMessage(req, res) {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			const { limit, page, type } = req.query;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (user) {
				const messageList = await dbMessage
					.find({ idUser: user.data.idUser, type: type })
					.skip(page * limit - limit)
					.limit(Number(limit))
					.sort({ read: 1, createdAt: -1 });
				const countMessage = await dbMessage.countDocuments({
					idUser: user.data.idUser,
					type: type,
					read: 0,
				});
				if (messageList) {
					return res.status(200).json({
						status: 1,
						code: 200,
						data: { messageList, countMessage },
					});
				} else {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'Not found data',
					});
				}
			}
		} catch (err) {
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error server',
			});
		}
	}

	async ReadMessageNotAccpet(req, res) {
		try {
			const token = req?.headers['authorization'].split(' ')[1];
			const { id } = req.query;
			const user = await jwt.verify(token, process.env.JWT_SECRET);
			if (user) {
				const message = await dbMessage.findOne({
					idUser: user.data.idUser,
					_id: id,
					type: 'post',
					style: 'not-accpet',
				});
				if (message) {
					await dbMessage.updateOne(
						{ idUser: user.data.idUser, _id: id },
						{ read: 1 },
					);
					return res.status(200).json({
						status: 1,
						code: 200,
						data: { ...message._doc },
					});
				} else {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'Not found data',
					});
				}
			}
		} catch (err) {
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error server',
			});
		}
	}
}

module.exports = new MeController();
