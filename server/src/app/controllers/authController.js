require('dotenv').config();
const dbUsers = require('../model/users');

const validator = require('validator');
const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');
const { listAvatar } = require('../../constant/listAvatarDefault');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class AuthController {
	//[POST] /api/v1/auth/register
	async register(req, res, next) {
		try {
			const indexAvatarDefault = Math.ceil(
				Math.random() * listAvatar.length,
			);
			const lengthName = 20;
			const firstName = xss(req.body.firstName, {});
			const lastName = xss(req.body.lastName, {});
			const emailUser = xss(req.body.email, {});
			const phoneUser = xss(req.body.phone, {});
			const passWord = xss(req.body.passWord, {});

			//check email in database
			const [isHadMail, isHadPhone] = await Promise.all([
				dbUsers.findOne({ email: emailUser }),
				dbUsers.findOne({ phone: phoneUser }),
			]);

			/*status = 0 is failure, status = 1 is successfully, status = -1 is error*/
			if (firstName && lastName && emailUser && passWord && phoneUser) {
				if (
					validator.isEmpty(validator.trim(firstName, '')) ||
					validator.isEmpty(validator.trim(lastName, '')) ||
					validator.isEmpty(validator.trim(emailUser, '')) ||
					validator.isEmpty(validator.trim(passWord, '')) ||
					validator.isEmpty(validator.trim(phoneUser, ''))
				) {
					return res.status(200).json({
						status: 0,
						code: 200,
						message: 'Incomplete information provided',
						message_vn: 'Vui lòng nhập đầy đủ thông tin',
					});
				} else {
					if (isHadMail) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: 'The email address has been used',
							message_vn: 'Địa chỉ email đã được sử dụng',
						});
					}

					if (isHadPhone) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: 'The phone number has been used',
							message_vn: 'Số điện thoại đã được sử dụng',
						});
					}

					if (
						firstName.length > lengthName ||
						lastName.length > lengthName
					) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: 'Your name is too long',
							message_vn: 'Tên của bạn quá dài',
						});
					}

					if (
						!validator.isLength(passWord, {
							min: 6,
						})
					) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: `Minimum passWord length is 6 characters`,
							message_vn: `Mật khẩu tối thiểu 6 kí tự`,
						});
					}

					if (!validator.isEmail(emailUser)) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: 'Not email',
							message_vn: 'Vui lòng nhập email chính xác',
						});
					} else {
						const derivedKey = pbkdf2.pbkdf2Sync(
							passWord,
							'salt',
							1,
							32,
							'sha512',
						);

						const newUser = new dbUsers({
							avatar: listAvatar[indexAvatarDefault],
							firstName,
							lastName,
							email: emailUser,
							phone: phoneUser,
							passWord: derivedKey,
							isAdmin: emailUser === process.env.EMAIL_ADMIN,
						});
						const saveData = await newUser.save();

						if (saveData) {
							const sendDate = {
								idUser: saveData._doc._id,
								firstName,
								lastName,
								phoneUser,
								isAdmin: saveData._doc.isAdmin,
								avatar: saveData._doc.avatar,
							};
							const accessToken = await jwt.sign(
								{
									data: { ...sendDate },
								},
								process.env.JWT_SECRET,
								{ expiresIn: '100y' },
							);
							return res.status(201).json({
								status: 1,
								code: 201,
								message: 'Create successfully!',
								data: { ...sendDate },
								accessToken,
								message_vn: 'Tạo tài khoản thành công',
							});
						} else {
							return res.status(500);
						}
					}
				}
			} else {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Incomplete information provided',
					message_vn: 'Vui lòng nhập đầy đủ thông tin',
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

	//[POST] /api/v1/auth/login
	async login(req, res, next) {
		try {
			const emailUser = xss(req.body.email, {});
			const passWord = xss(req.body.passWord, {});

			if (
				!emailUser ||
				!passWord ||
				validator.isEmpty(validator.trim(emailUser, '')) ||
				validator.isEmpty(validator.trim(passWord, ''))
			) {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Incomplete information provided',
					message_vn: 'Vui lòng nhập đầy đủ thông tin',
				});
			}

			//Find user on database
			const derivedKey = pbkdf2.pbkdf2Sync(
				passWord,
				'salt',
				1,
				32,
				'sha512',
			);

			const dataUser = await dbUsers.findOne({
				email: emailUser,
				passWord: derivedKey,
			});

			if (dataUser) {
				const { _id, lastName, firstName, phone, avatar, isAdmin } =
					dataUser._doc;
				const sendDate = {
					idUser: _id,
					lastName,
					firstName,
					phoneUser: phone,
					avatar,
					isAdmin,
				};
				const accessToken = await jwt.sign(
					{
						data: { ...sendDate },
					},
					process.env.JWT_SECRET,
					{ expiresIn: '100y' },
				);
				return res.status(200).json({
					status: 1,
					code: 201,
					message: 'Login success',
					message_vn: 'Đăng nhập thành công',
					data: { ...sendDate },
					accessToken,
				});
			} else {
				return res.status(200).json({
					status: 0,
					code: 200,
					message: 'Login failure',
					message_vn: 'Tài khoản hoặc mật khẩu không chính xác',
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

	//[GET] /api/v1/auth/current-user
	async currentUser(req, res, next) {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			if (!token || token == 'null')
				return res.status(401).json({
					status: 0,
					code: 401,
					message:
						'Failed to authenticate because of bad credentials or an invalid authorization header',
				});

			const data = await jwt.verify(token, process.env.JWT_SECRET);
			if (data) {
				const user = data.data;
				const isUser = await dbUsers.findOne({ _id: user.idUser });
				if (isUser) {
					return res.status(200).json({
						status: 1,
						code: 200,
						user,
						message: 'Invalid',
					});
				} else {
					return res.status(401).json({
						status: 0,
						code: 401,
						message: 'NotFound User',
					});
				}
			} else {
				return res.status(401).json({
					status: 0,
					code: 401,
					message: 'Forbidden',
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
}

module.exports = new AuthController();
