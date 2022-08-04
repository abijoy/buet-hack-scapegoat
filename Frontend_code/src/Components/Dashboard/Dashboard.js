// import React from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux-toolkit/LoginSlice";

import Dashscreen from "./Dashscreen/Dashscreen";
import Navbar from "../Navbar/Navbar";
import Map from "../Map/Map";
import "./Dashboard.css";

// import SideMenu from "./SideMenu/SideMenu";
// import { Switch } from "react-router-dom";

export default function Dashboard() {
	let { path, url } = useRouteMatch();
	return (
		<div
			className='d-flex flex-column dashboard '
			style={{
				height: "100vh",
			}}>
			<div>
				<Navbar />
			</div>

			<div className='flex-1 '>
				<Switch>
					<Route exact path='/'>
						<Dashscreen />
					</Route>
					<Route exact path='/search'>
						<Dashscreen />
					</Route>
					<Route exact path='/note'>
						<Dashscreen />
					</Route>
				</Switch>
			</div>
		</div>
	);
}
