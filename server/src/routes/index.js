require('dotenv').config();
const Admin = require('./apiAdmin');
const Auth = require('./apiAuth');
const Post = require('./apiPost');
const Me = require('./apiMe');
const User = require('./apiUser');
const Comments = require('./apiComments');
const middlewaresAuth = require('../middlewares/auth');
const delayRoute = require('../middlewares/delayRoute');

async function route(app) {
	app.use(
		`${process.env.BASE_API}/admin`,
		middlewaresAuth.isAdmin,
		delayRoute.start,
		Admin,
	);
	app.use(`${process.env.BASE_API}/auth`, delayRoute.start, Auth);
	app.use(`${process.env.BASE_API}/posts`, delayRoute.start, Post);
	app.use(`${process.env.BASE_API}/users`, delayRoute.start, User);
	app.use(`${process.env.BASE_API}/comments`, delayRoute.start, Comments);
	app.use(
		`${process.env.BASE_API}/me`,
		middlewaresAuth.authVerify,
		delayRoute.start,
		Me,
	);
}

module.exports = route;
