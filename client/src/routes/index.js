import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from '../utils/Protected';
import LoginPage from '../views/screens/Auth/LoginPage';
import RegisterPage from '../views/screens/Auth/RegisterPage';
import HomePage from '../views/screens/Home';
import PostPage from '../views/screens/Posts';
import MeAddPost from '../views/screens/Me/MeAddPost';

function Routers() {
	const { isLogged } = useSelector(state => state.user);

	return (
		<Switch>
			<Route exact path="/post/:id">
				<PostPage />
			</Route>
			<ProtectedRoute
				path="/me/add-post"
				redirect="/login"
				dependency={isLogged}
			>
				<MeAddPost />
			</ProtectedRoute>
			<ProtectedRoute path="/login" redirect="/" dependency={!isLogged}>
				<LoginPage />
			</ProtectedRoute>
			<ProtectedRoute
				path="/register"
				redirect="/"
				dependency={!isLogged}
			>
				<RegisterPage />
			</ProtectedRoute>
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default Routers;
