require('dotenv').config();
const dbUsers = require('./model/users');

const validator = require('validator');
const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const sanitizer = require('sanitizer');

//Check xss
const xss = str => {
	return sanitizer.sanitize(sanitizer.escape(str));
};

class AuthController {
	async register(req, res, next) {
		/*Check if the username is in the correct format.*/
		try {
			const lengthName = 20;
			const date = new Date();
			const yearNow = date.getFullYear();

			const firstName = xss(req.body.firstname, {});
			const lastName = xss(req.body.lastname, {});
			const emailUser = xss(req.body.email, {});
			const passWord = xss(req.body.password, {});
			const dayOfBirth = xss(req.body.day, {});
			const monthOfBirth = xss(req.body.month, {});
			const yearOfBirth = xss(req.body.year, {});
			const gender = xss(req.body.gender, {});

			//check email in database
			const isHadMail = await dbUsers.findOne({ emailUser });
			/*status = 0 is failure, status = 1 is successfully, status = -1 is error*/
			if (
				firstName &&
				lastName &&
				emailUser &&
				passWord &&
				dayOfBirth &&
				monthOfBirth &&
				yearOfBirth &&
				gender
			) {
				if (
					validator.isEmpty(validator.trim(firstName, '')) ||
					validator.isEmpty(validator.trim(lastName, '')) ||
					validator.isEmpty(validator.trim(emailUser, '')) ||
					validator.isEmpty(validator.trim(passWord, '')) ||
					validator.isEmpty(validator.trim(dayOfBirth, '')) ||
					validator.isEmpty(validator.trim(monthOfBirth, '')) ||
					validator.isEmpty(validator.trim(yearOfBirth, '')) ||
					validator.isEmpty(validator.trim(gender, ''))
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

					if (yearNow - Number(yearOfBirth) < 5) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message: 'Check your date of birth',
							message_vn:
								'Kiểm tra lại ngày tháng năm sinh của bạn',
						});
					}

					if (yearNow - Number(yearOfBirth) < 13) {
						return res.status(200).json({
							status: 0,
							code: 200,
							message:
								'We are unable to register an account for you',
							message_vn:
								'Chúng tôi không thể đăng ký tài khoản cho bạn',
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
							message: `Minimum password length is 6 characters`,
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
							firstName,
							lastName,
							email: emailUser,
							dayOfBirth,
							monthOfBirth,
							yearOfBirth,
							gender,
							fullName: `${firstName} ${lastName}`,
							password: derivedKey,
						});
						const saveData = await newUser.save();

						//get id User and remove password
						const { _id, email } = saveData._doc;

						if (saveData) {
							const accessToken = jwt.sign(
								{
									data: { email, id: _id },
								},
								process.env.JWT_SECRET,
								{ expiresIn: '100y' },
							);
							return res.status(201).json({
								status: 1,
								code: 201,
								message: 'Create successfully!',
								data: { email, id: _id },
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
			return res.status(500);
		}
	}

	async login(req, res, next) {
		try {
			const emailUser = xss(req.body.email, {});
			const passWord = xss(req.body.password, {});

			const derivedKey = pbkdf2.pbkdf2Sync(
				passWord,
				'salt',
				1,
				32,
				'sha512',
			);

			if (
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
			const dataUser = await dbUsers.findOne({
				email: emailUser,
				password: derivedKey,
			});
			const { _id, email } = dataUser._doc;

			if (dataUser) {
				const accessToken = jwt.sign(
					{
						data: { email, id: _id },
					},
					process.env.JWT_SECRET,
					{ expiresIn: '100y' },
				);
				return res.status(200).json({
					status: 1,
					code: 201,
					message: 'Login success',
					message_vn: 'Đăng nhập thành công',
					data: { email, id: _id },
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
			return res.status(500);
		}
	}

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
				const isUser = await dbUsers.findOne({ email: user.email });

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
