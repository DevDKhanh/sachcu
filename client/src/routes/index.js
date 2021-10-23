import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { ProtectedRoute } from '../utils/Protected';

import LoginPage from '../views/screens/Auth/LoginPage';
import RegisterPage from '../views/screens/Auth/RegisterPage';
import HomePage from '../views/screens/Home';
import PostPage from '../views/screens/Posts';

function Routers() {
	return (
		<Switch>
			<Route exact path="/login">
				<LoginPage />
			</Route>
			<Route exact path="/register">
				<RegisterPage />
			</Route>
			<Route exact path="/post/:id">
				<PostPage />
			</Route>
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default Routers;
