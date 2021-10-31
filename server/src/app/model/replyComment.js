const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentRelpySchame = new Schema(
	{
		idUser: { type: String, default: null, required: true },
		idComment: { type: String, default: null, required: true },
		comment: { type: String, default: null, max: 400, required: true },
		status: { type: Number, default: 1, required: true }, //0=wait for confirmation, 1=active, 2=delete
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(
	'commentRelpys_tbls',
	commentRelpySchame.index({ '$**': 'text' }),
);
