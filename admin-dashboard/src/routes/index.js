import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from '../utils/Protected';
import LoginPage from '../views/screens/Auth/LoginPage';
import RegisterPage from '../views/screens/Auth/RegisterPage';
import HomePage from '../views/screens/Home';
import CategoryPage from '../views/screens/Category';
import PostPage from '../views/screens/Posts';
import AddPostPage from '../views/screens/Me/AddPostPage';
import MyPostPage from '../views/screens/Me/MyPostPage';

function Routers() {
	const { isLogged } = useSelector(state => state.user);

	return (
		<Switch>
			<Route exact path="/category/:role">
				<CategoryPage />
			</Route>
			<Route exact path="/post/:slug">
				<PostPage />
			</Route>
			<ProtectedRoute
				path="/me/add-post"
				redirect="/login"
				dependency={isLogged}
			>
				<AddPostPage />
			</ProtectedRoute>
			<ProtectedRoute
				path="/me/my-post"
				redirect="/login"
				dependency={isLogged}
			>
				<MyPostPage />
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
