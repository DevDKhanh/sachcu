require('dotenv').config();
const Admin = require('./apiAdmin');
const Auth = require('./apiAuth');
const Post = require('./apiPost');
const Me = require('./apiMe');
const User = require('./apiUser');
const Comments = require('./apiComments');
const middlewaresAuth = require('../middlewares/auth');

async function route(app) {
	app.use(`${process.env.BASE_API}/admin`, middlewaresAuth.isAdmin, Admin);
	app.use(`${process.env.BASE_API}/auth`, Auth);
	app.use(`${process.env.BASE_API}/posts`, Post);
	app.use(`${process.env.BASE_API}/users`, User);
	app.use(`${process.env.BASE_API}/comments`, Comments);
	app.use(`${process.env.BASE_API}/me`, middlewaresAuth.authVerify, Me);
}

module.exports = route;
