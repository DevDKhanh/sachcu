require('dotenv').config();
const dbUsers = require('./model/users');
const dbPosts = require('./model/posts');
const dbComments = require('./model/comments');

const jwt = require('jsonwebtoken');

class CommentController {
	async getCommentOfPage(req, res, next) {
		try {
			const { slug, limit } = req.query;
			if (slug) {
				const dataComments = await dbComments
					.find({ slug })
					.limit(limit || 3)
					.sort({ createdAt: -1 });

				if (dataComments) {
					return res.status(200).json({
						status: 0,
						code: 200,
						data: dataComments,
					});
				} else {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Not found data',
					});
				}
			} else {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Please add query slug',
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

module.exports = new CommentController();