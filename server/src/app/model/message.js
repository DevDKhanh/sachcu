const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchame = new Schema(
	{
		idUser: { type: String, default: null, required: true },
		type: { type: String, default: 'post', max: 20, required: true },
		title: { type: String, default: null, max: 100, required: true },
		slug: { type: String, default: null, max: 100, required: true },
		style: { type: String, default: null, max: 20, required: true },
		message: { type: String, default: null, max: 2000, required: true },
		read: { type: Number, default: 0, required: true },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'messages_tbls',
	messageSchame.index({ '$**': 'text' }),
);
