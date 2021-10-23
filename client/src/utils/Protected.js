import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ path, redirect, dependency, children }) {
	return (
		<Route exact path={path}>
			{dependency ? <Redirect to={{ pathname: redirect }} /> : children}
		</Route>
	);
}

export function ProtectedComponent({ dependency, children }) {
	return <React.Fragment>{dependency && children}</React.Fragment>;
}
