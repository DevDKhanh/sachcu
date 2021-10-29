require('dotenv').config();
const dbUsers = require('./model/users');
const dbPosts = require('./model/posts');
const dbStarReviews = require('./model/starReviews');

const jwt = require('jsonwebtoken');

class PostController {
	//get an post
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
				return res.status(200).json({
					status: 1,
					code: 200,
					data: post,
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

	//get multiple  post
	async getPosts(req, res, next) {
		try {
			const { category, limit } = req.query;
			let posts;

			if (category === 'all') {
				posts = await dbPosts
					.find()
					.limit(Number(limit))
					.sort({ createdAt: -1 });
			} else if (category) {
				posts = await dbPosts
					.find({ category: category })
					.limit(Number(limit))
					.sort({ createdAt: -1 });
			}

			if (posts) {
				return res.status(200).json({
					status: 1,
					code: 200,
					data: [...posts],
				});
			} else {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Not found posts',
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

	//create reviews
	async postReviews(req, res, next) {
		try {
			const { star, idUser, slug } = req.body;
			if (star && idUser && slug) {
				const [isHadReviews, isHadUser, isHadPost] = await Promise.all([
					dbStarReviews.findOne({ idUser, slug }),
					dbUsers.findOne({ _id: idUser }),
					dbPosts.findOne({ slug: slug }),
				]);

				//check star
				if (Number(star) < 0 || Number(star) > 5) {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'Invalid data',
					});
				}

				if (isHadReviews) {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Has been evaluated',
						message_vn: 'Bạn đã đánh giá bài viết này',
					});
				}

				if (!isHadUser || !isHadPost) {
					return res.status(400).json({
						status: 0,
						code: 400,
						message: 'This user or post does not exist',
					});
				} else {
					//Create data
					const newReviews = new dbStarReviews({
						idUser,
						slug,
						numberStar: star,
					});

					//Save data
					const saveReviews = await newReviews.save();

					if (saveReviews) {
						//Success
						return res.status(201).json({
							status: 1,
							code: 201,
							message: 'Successfully',
							message_vn: 'Đánh giá thành công',
						});
					} else {
						//Error
						return res.status(500).json({
							status: 0,
							code: 500,
							message: "Error server, can't create",
						});
					}
				}
			} else {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Incomplete data',
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

	async getStarReviews(req, res, next) {
		try {
			const { slug } = req.query;
			if (!slug) {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Not found slug query',
				});
			} else {
				const getStar = await dbStarReviews.find({ slug });
				if (getStar.length > 0) {
					return res.status(200).json({
						status: 1,
						code: 200,
						data: [...getStar],
					});
				} else {
					return res.status(200).json({
						status: 1,
						code: 200,
						message: 'Not found data with this slug',
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

module.exports = new PostController();
