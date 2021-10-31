const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchame = new Schema(
	{
		idUser: { type: String, default: null, required: true },
		slug: { type: String, default: null, max: 55, required: true },
		comment: { type: String, default: null, max: 400, required: true },
		status: { type: Number, default: 1, required: true }, //0=wait for confirmation, 1=active, 2=delete
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'comments_tbls',
	commentSchame.index({ '$**': 'text' }),
);
