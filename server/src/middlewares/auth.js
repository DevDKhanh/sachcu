require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports.isAdmin = async function (req, res, next) {
	try {
		const token = req.headers['authorization'].split(' ')[1];

		if (!token)
			return res.status(401).json({
				status: 0,
				code: 401,
				message:
					'Failed to authenticate because of bad credentials or an invalid authorization header',
				message_vn: 'Không có quyền truy cập',
			});

		if (req.headers && token) {
			jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
				if (err) {
					return res.status(403).json({
						status: 0,
						code: 403,
						message: 'Forbidden',
						message_vn: 'Không có quyền truy cập',
					});
				} else {
					if (data.data.isAdmin) return next();
					else
						return res.status(403).json({
							status: 0,
							code: 403,
							message: 'Forbidden',
							message_vn: 'Không có quyền truy cập',
						});
				}
			});
		} else {
			return res.status(403).json({
				status: 0,
				code: 403,
				message: 'Forbidden',
				message_vn: 'Không có quyền truy cập',
			});
		}
	} catch (err) {
		return res.status(403).json({
			status: 0,
			code: 403,
			message: 'Forbidden',
			message_vn: 'Không có quyền truy cập',
		});
	}
};

module.exports.authVerify = function (req, res, next) {
	try {
		const token = req.headers['authorization'].split(' ')[1];

		if (!token)
			return res.status(401).json({
				status: 0,
				code: 401,
				message:
					'Failed to authenticate because of bad credentials or an invalid authorization header',
				message_vn: 'Không có quyền truy cập',
			});

		if (req.headers && token) {
			jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
				if (err) {
					return res.status(403).json({
						status: 0,
						code: 403,
						message: 'Forbidden',
						message_vn: 'Không có quyền truy cập',
					});
				} else {
					next();
				}
			});
		} else {
			return res.status(403).json({
				status: 0,
				code: 403,
				message: 'Forbidden',
				message_vn: 'Không có quyền truy cập',
			});
		}
	} catch (err) {
		return res.status(403).json({
			status: 0,
			code: 403,
			message: 'Forbidden',
			message_vn: 'Không có quyền truy cập',
		});
	}
};
