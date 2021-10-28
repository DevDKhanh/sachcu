const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
	cloud_name: process.env.NAME_CLOUDINARY,
	api_key: process.env.KEY_CLOUDINARY,
	api_secret: process.env.SECERT_CLOUDINARY,
});

module.exports = cloudinary;
