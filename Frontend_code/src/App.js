// import React from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NormalUser from "./Components/NormalUser/NormalUser";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<PrivateRoute
					exact
					path='/dashboard'
					component={Dashboard}></PrivateRoute>
				{/* <Route exact path='/dashboard'>
					<Dashboard />
				</Route> */}
				{/* <Route exact path='/normal'>
					<NormalUser />
				</Route> */}
			</Switch>
		</Router>
	);
}

export default App;
