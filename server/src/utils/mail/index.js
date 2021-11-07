require('dotenv').config();
const nodeMailer = require('nodemailer');
const adminEmail = process.env.GMAIL;
const adminPassword = process.env.PASS_GMAIL;

const transporter = nodeMailer.createTransport({
	service: 'gmail',
	secure: false,
	auth: {
		user: adminEmail,
		pass: adminPassword,
	},
});

module.exports.sendMail = (to, subject, text) => {
	const options = {
		from: adminEmail,
		to: to,
		subject: subject,
		html: text,
	};
	return transporter.sendMail(options);
};

module.exports.sendMailVerify = (email, token) => {
	const options = {
		from: adminEmail,
		to: email,
		subject: 'Mail xác thực',
		html: `<h1>Xin chào, cảm ơn bạn đã tham gia</h1>
		<br/>
		<h3>Đây là mail xác thực của bạn</h3>
		<br/>
		<a href="${process.env.HOST_FRONT_END}/auth/verify?email=${email}&token=${token}">Xác thực tài khoản của bạn</a>`,
	};
	return transporter.sendMail(options);
};
