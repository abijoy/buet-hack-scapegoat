import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
	const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
	const dispatch = useDispatch();
	const location = useLocation();
	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location.pathname },
						}}
					/>
				)
			}
		/>
	);
}
