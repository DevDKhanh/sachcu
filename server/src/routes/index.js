require('dotenv').config();
const Auth = require('./apiAuth');
const Post = require('./apiPost');
const Me = require('./apiMe');
const User = require('./apiUser');
const middlewaresAuth = require('../middlewares/auth');

function route(app) {
	app.use(`${process.env.BASE_API}/auth`, Auth);
	app.use(`${process.env.BASE_API}/posts`, Post);
	app.use(`${process.env.BASE_API}/users`, User);
	app.use(`${process.env.BASE_API}/me`, middlewaresAuth.authVerify, Me);
}

module.exports = route;
