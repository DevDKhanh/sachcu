const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchame = new Schema(
	{
		idUser: { type: String, default: null },
		type: { type: String, default: 'post', max: 20 },
		title: { type: String, default: null, max: 100 },
		slug: { type: String, default: null, max: 100 },
		style: { type: String, default: null, max: 20 },
		message: { type: String, default: null, max: 255 },
		content: { type: String, default: null, max: 2000 },
		read: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'messages_tbls',
	messageSchame.index({ '$**': 'text' }),
);
