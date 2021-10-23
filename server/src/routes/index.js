require('dotenv').config();
const Auth = require('./apiAuth');
const middlewaresAuth = require('../middlewares/auth');

function route(app) {
	app.use(`${process.env.BASE_API}/auth`, Auth);
}

module.exports = route;
