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
import DashboardPosts from '../views/screens/Admin/DashboardPosts';
import DashboardUsers from '../views/screens/Admin/DashboardUsers';
import ReadMessage from '../views/screens/Me/ReadMessage';
import NotifyCommentPage from '../views/screens/Me/NotifyCommentPage';

function Routers() {
	const { isLogged, infoUser } = useSelector(state => state.user);

	console.log(infoUser.isAdmin);

	return (
		<Switch>
			{/********** category route **********/}
			<Route exact path="/category/:role">
				<CategoryPage />
			</Route>

			{/********** info post route **********/}
			<Route exact path="/post/:slug">
				<PostPage />
			</Route>

			{/********** admin route **********/}
			<ProtectedRoute
				path="/dashboard/users"
				redirect="/"
				dependency={isLogged && infoUser.isAdmin}
			>
				<DashboardUsers />
			</ProtectedRoute>

			<ProtectedRoute
				path="/dashboard/posts"
				redirect="/"
				dependency={isLogged && infoUser.isAdmin}
			>
				<DashboardPosts />
			</ProtectedRoute>

			{/********** me route **********/}
			<ProtectedRoute
				path="/me/message/not-accpet/:id"
				redirect="/login"
				dependency={isLogged}
			>
				<ReadMessage />
			</ProtectedRoute>

			<ProtectedRoute
				path="/me/notify-comment"
				redirect="/login"
				dependency={isLogged}
			>
				<NotifyCommentPage />
			</ProtectedRoute>

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

			{/********** auth route **********/}
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

			{/********** index route **********/}
			<Route exact path="/">
				<HomePage />
			</Route>
		</Switch>
	);
}

export default Routers;
