const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchame = new Schema(
	{
		email: { type: String, default: null, min: 4, max: 255 },
		avatar: {
			type: String,
			default: 'http://cdn.onlinewebfonts.com/svg/img_550782.png',
		},
		idImageAvatar: { type: String, default: null },
		firstName: { type: String, default: null, max: 55 },
		lastName: { type: String, default: null, max: 55 },
		fullName: { type: String, default: null, max: 55 },
		slug: { type: String, default: null, max: 55 },
		gender: { type: String, default: null, max: 25 },
		dayOfBirth: { type: String, default: null, max: 2 },
		monthOfBirth: { type: String, default: null, max: 2 },
		yearOfBirth: { type: String, default: null, max: 10 },
		school: { type: String, default: null, min: 4, max: 255 },
		currentCity: { type: String, default: null, min: 4, max: 255 },
		homeTown: { type: String, default: null, min: 4, max: 255 },
		password: { type: String, min: 6, max: 1024 },
		provider: { type: String, default: 'novi', min: 4, max: 50 },
		socialId: { type: String, default: null, min: 4, max: 100 },
		position: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'users_tbls',
	userSchame.index({ '$**': 'text' }),
);
