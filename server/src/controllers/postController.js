require('dotenv').config();
const dbUsers = require('./model/users');
const dbPosts = require('./model/posts');

const jwt = require('jsonwebtoken');

class PostController {
	async getPost(req, res, next) {
		try {
			const { slug } = req.query;
			const post = await dbPosts.findOne({ slug });
			if (!slug) {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Missing slug',
				});
			}

			if (post) {
				const { _id, ...rest } = post._doc;
				return res.status(200).json({
					status: 1,
					code: 200,
					data: rest,
				});
			} else {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Not found post',
				});
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

module.exports = new PostController();
