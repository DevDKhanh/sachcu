require('dotenv').config();
const dbUsers = require('../model/users');
const dbPosts = require('../model/posts');
const dbStarReviews = require('../model/starReviews');

const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class PostController {
	async countPosts(req, res, next) {
		try {
			const count = await dbPosts.countDocuments({
				isDelete: false,
				isReady: true,
			});

			if (count) {
				return res.status(200).json({
					status: 1,
					code: 200,
					data: count,
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

	//[GET] /api/v1/posts/post?slug=...
	async getPost(req, res, next) {
		try {
			const { slug } = req.query;
			const token = req?.headers['authorization'].split(' ')[1];
			const user = await jwt.verify(token, process.env.JWT_SECRET);

			/********** check if admin **********/
			if (token && user.data.isAdmin) {
				const post = await dbPosts.findOne({
					slug,
				});
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
			}

			/********** user **********/
			const post = await dbPosts.findOne({
				slug,
				isDelete: false,
				isReady: true,
			});

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

	//[GET] /api/v1/posts?category=...&limit=...
	async getPosts(req, res, next) {
		try {
			const { category, limit, page, myPage } = req.query;
			const numberLimit = Number(limit) || 4;
			const token = req.headers['authorization'].split(' ')[1];
			let posts;
			let countPost;

			if (myPage == 'true') {
				const user = await jwt.verify(token, process.env.JWT_SECRET);
				if (user) {
					posts = await dbPosts
						.find({
							idUser: user.data.idUser,
							isDelete: false,
							isReady: true,
						})
						.skip(page * numberLimit - numberLimit)
						.limit(numberLimit)
						.sort({ createdAt: -1 });

					countPost = await dbPosts.countDocuments({
						idUser: user.data.idUser,
					});
				} else {
					return res.status(403).json({
						status: 0,
						code: 403,
						message: 'Forbidden',
					});
				}
			} else {
				if (category === 'all') {
					posts = await dbPosts
						.find({ isDelete: false, isReady: true })
						.skip(page * numberLimit - numberLimit)
						.limit(numberLimit)
						.sort({ status: 1, createdAt: -1 });
					countPost = await dbPosts.countDocuments();
				} else if (category) {
					posts = await dbPosts
						.find({
							category: category,
							isDelete: false,
							isReady: true,
						})
						.skip(page * numberLimit - numberLimit)
						.limit(numberLimit)
						.sort({ status: 1, createdAt: -1 });
					countPost = await dbPosts.countDocuments({
						category: category,
					});
				}
			}

			if (posts) {
				return res.status(200).json({
					status: 1,
					code: 200,
					data: [...posts],
					countPost,
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

	//[POST] /api/v1/posts/reviews
	async postReviews(req, res, next) {
		try {
			const { star, idUser, slug } = req.body;
			if (star && idUser && slug) {
				const [isHadReviews, isHadUser, isHadPost] = await Promise.all([
					dbStarReviews.findOne({
						idUser,
						slug,
						isDelete: false,
						isReady: true,
					}),
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

	//[GET] /api/v1/posts/reviews?slug=...
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
				const getStar = await dbStarReviews.find({
					slug,
					isDelete: false,
					isReady: true,
				});
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

	//[GET] /api/v1/posts/search?key=...
	async searchPost(req, res, next) {
		try {
			const { key, limit, page } = req.query;
			if (!key) {
				return res.status(400).json({
					status: 0,
					code: 400,
					message: 'Not found key query',
				});
			} else {
				const posts = await dbPosts
					.find({
						$text: { $search: '"' + key + '"' },
					})
					.skip(page * limit - limit)
					.limit(Number(limit))
					.sort({ status: 1, createdAt: -1 });

				const count = await dbPosts.countDocuments({
					$text: { $search: '"' + key + '"' },
				});

				if (posts) {
					return res.status(200).json({
						status: 1,
						code: 200,
						data: [...posts],
						count,
					});
				} else {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Not found posts',
					});
				}
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				status: 0,
				code: 500,
				message: 'Error server',
			});
		}
	}
}

module.exports = new PostController();
