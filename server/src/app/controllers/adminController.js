require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');

const validator = require('validator');
const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class AdminController {
	async getPosts(req, res, next) {
		try {
			const data = await dbPosts.find();
			res.status(200).json(data);
		} catch (err) {
			res.status(500).json('Error');
		}
	}

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

	async deletePost(req, res, next) {
		try {
			const { id } = req.query;
			await dbPosts.deleteOne({ _id: id });
			res.status(200).json(id);
		} catch (err) {
			res.status(500).json('Error');
		}
	}
}

module.exports = new AdminController();
