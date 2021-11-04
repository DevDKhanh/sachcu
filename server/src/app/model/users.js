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
		passWord: { type: String, min: 6, max: 1024 },
		socialId: { type: String, default: null, min: 4, max: 100 },
		isAdmin: { type: Boolean, default: false, required: true },
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
