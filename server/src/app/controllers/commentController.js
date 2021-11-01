require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');
const dbComments = require('../model/comments');
const dbReplyComments = require('../model/replyComment');

const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};
class CommentController {
	//[GET] /api/v1/comments/page?slug=...&limit=...
	async getCommentOfPage(req, res, next) {
		try {
			const { slug, limit, isReply, page } = req.query;
			const numberLimit = Number(limit) || 3;
			if (slug) {
				let dataComments;
				let countComments;
				if (isReply == 'true') {
					countComments = await dbReplyComments.countDocuments({
						idComment: slug,
					});
					dataComments = await dbReplyComments
						.find({ idComment: slug })
						.skip(page * numberLimit - numberLimit)
						.limit(numberLimit)
						.sort({ createdAt: -1 });
				} else {
					countComments = await dbComments.countDocuments({
						slug,
					});
					dataComments = await dbComments
						.find({ slug })
						.skip(page * numberLimit - numberLimit)
						.limit(numberLimit)
						.sort({ createdAt: -1 });
				}

				if (dataComments) {
					return res.status(200).json({
						status: 1,
						code: 200,
						data: dataComments,
						countComments,
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
