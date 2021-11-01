const delay = require('delay');

module.exports.start = async (req, res, next) => {
	await delay(1000);
	next();
};
