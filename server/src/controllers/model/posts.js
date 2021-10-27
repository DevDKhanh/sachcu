const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchame = new Schema(
	{
		email: { type: String, default: null, min: 4, max: 255 },
		title: { type: String, default: null, max: 55 },
		slug: { type: String, default: null, max: 55 },
		description: { type: String, default: null, max: 255 },
		category: { type: String, default: null, max: 55 },
		image: { type: String, default: null },
		author: { type: String, default: null },
		idImage: { type: String, default: null },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'posts_tbls',
	postSchame.index({ '$**': 'text' }),
);
