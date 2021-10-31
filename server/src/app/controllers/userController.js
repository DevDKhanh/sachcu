require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');

const jwt = require('jsonwebtoken');

class PostController {
	//[GET] /api/v1/users/user/contact?idUser=...
	async getContact(req, res, next) {
		try {
			const { idUser } = req.query;
			if (idUser) {
				const user = await dbUsers.findOne({ _id: idUser });
				if (user) {
					const { lastName, firstName, phone, _id, avatar } =
						user._doc;
					return res.status(200).json({
						status: 1,
						code: 200,
						data: { lastName, firstName, phone, id: _id, avatar },
					});
				} else {
					return res.status(400).json({
						status: 1,
						code: 400,
						message: 'Not found user',
					});
				}
			}
		} catch (err) {
			return res.status(500).json({
				status: 1,
				code: 500,
				message: 'Error',
			});
		}
	}
}

module.exports = new PostController();
