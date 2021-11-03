const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const postSchame = new Schema(
	{
		idUser: {
			type: String,
			default: null,
			required: true,
		},
		title: { type: String, default: null, max: 55, required: true },
		slug: { type: String, slug: 'title', unique: true },
		content: { type: String, default: null, max: 255, required: true },
		category: { type: String, default: null, max: 55, required: true },
		author: { type: String, default: null, required: true },
		image: { type: String, default: null, required: true }, // link img on cloud
		idImage: { type: String, default: null, required: true }, // id img on cloud
		isReady: { type: Boolean, default: false, required: true },
		isDelete: { type: Boolean, default: false, required: true },
		status: { type: Number, default: 0, required: true }, //1=active, 2=unActive
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'posts_tbls',
	postSchame.index({ '$**': 'text' }),
);
