require('dotenv').config();

const cors = require('cors');

const corsOptions = {
	origin: process.env.HOST_FRONT_END,
};

function config() {
	return cors(corsOptions);
}

module.exports = { config };
