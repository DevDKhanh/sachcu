const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchame = new Schema(
	{
		email: { type: String, default: null, min: 4, max: 255 },
		avatar: { type: String, default: '' },
		idImageAvatar: { type: String, default: null },
		firstName: { type: String, default: null, max: 55 },
		lastName: { type: String, default: null, max: 55 },
		phone: { type: String, default: null, max: 12 },
		slug: { type: String, default: null, max: 55 },
		gender: { type: String, default: null, max: 25 },
		dayOfBirth: { type: String, default: null, max: 2 },
		monthOfBirth: { type: String, default: null, max: 2 },
		yearOfBirth: { type: String, default: null, max: 10 },
		passWord: { type: String, min: 6, max: 1024 },
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
