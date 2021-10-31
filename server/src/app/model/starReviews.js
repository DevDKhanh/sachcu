const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const starReviewSchame = new Schema(
	{
		idUser: {
			type: String,
			default: null,
			min: 4,
			max: 255,
			required: true,
		},
		slug: {
			type: String,
			default: null,
			required: true,
		},
		numberStar: {
			type: Number,
			default: 1,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'starReviews_tbls',
	starReviewSchame.index({ '$**': 'text' }),
);
