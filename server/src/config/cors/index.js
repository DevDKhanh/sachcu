require('dotenv').config();

const cors = require('cors');

const corsOptions = {
	origin: [process.env.HOST_FRONT_END, process.env.HOST_FRONT_END_ADMIN],
};

function config() {
	return cors(corsOptions);
}

module.exports = { config };
