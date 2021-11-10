require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');

const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class AdminController {
	//[GET] /api/v1/admin/users?limit=...&page=...
	async getUsers(req, res, next) {
		try {
			const { limit, page } = req.query;
			const data = await dbUsers
				.find({})
				.skip(page * limit - limit)
				.limit(Number(limit))
				.sort({ createdAt: -1 });
			const count = await dbUsers.countDocuments({});
			res.status(200).json({ data, count });
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[DELETE] /api/v1/admin/users/user
	async deleteUser(req, res, next) {
		try {
			const { id } = req.query;
			await dbUsers.deleteOne({ _id: id });
			res.status(200).json(id);
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[GET] /api/v1/admin/posts/censorship?limit=...&page=...
	async getPostsCensorship(req, res, next) {
		try {
			const { limit, page } = req.query;
			const data = await dbPosts
				.find({ isReady: false })
				.skip(page * limit - limit)
				.limit(Number(limit))
				.sort({ createdAt: -1 });
			const count = await dbPosts.countDocuments({ isReady: false });
			res.status(200).json({ data, count });
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[GET] /api/v1/admin/posts?limit=...&page=...&isReady=...
	async getPosts(req, res, next) {
		try {
			const { limit, page, isReady } = req.query;
			const data = await dbPosts
				.find()
				.skip(page * limit - limit)
				.limit(Number(limit))
				.sort({ createdAt: -1 });
			const count = await dbPosts.countDocuments();
			res.status(200).json({ data, count });
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[PUT] /api/v1/admin/posts/post/active
	async updateActivePost(req, res, next) {
		try {
			const { id, toggle } = req.body;
			await dbPosts.updateOne({ _id: id }, { isDelete: toggle });
			const post = await dbPosts.findOne({ _id: id });
			res.status(200).json(post);
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[DELETE] /api/v1/admin/posts/post?id=...
	async deletePost(req, res, next) {
		try {
			const { id } = req.query;
			await dbPosts.deleteOne({ _id: id });
			res.status(200).json(id);
		} catch (err) {
			res.status(500).json('Error');
		}
	}

	//[PUT] /api/v1/admin/posts/post/accpe
	async accpetPost(req, res, next) {
		try {
			const { id } = req.body;
			await dbPosts.updateOne({ _id: id }, { isReady: true });
			res.status(200).json(id);
		} catch (err) {
			res.status(500).json('Error');
		}
	}
}

module.exports = new AdminController();
