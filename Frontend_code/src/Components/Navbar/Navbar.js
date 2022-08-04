import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux-toolkit/LoginSlice";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { UilLocationPoint } from "@iconscout/react-unicons";
import {
	faAngleDown,
	faMapLocation,
	faMapMarker,
	faMapMarkerAlt,
	faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
	const [logoutShow, setlogoutShow] = useState(false);
	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	// console.log(location.state.admin);
	const logout = () => {
		dispatch(setLogin(false));
		history.push("/");
	};
	return (
		<div className='navbar p-3 d-flex justify-content-between'>
			<div className='d-flex align-items-center'>
				{/* {location.state.admin === true ? "admin" : "normal user"} */}
				<div className='d-flex align-items-center me-2'>
					<span>
						<img
							style={{ height: "40px" }}
							src='/assets/goatIcon.png'
							alt=''
							className='img-fluid'
						/>
					</span>
					<span className='ms-3 fs-3'>
						<>ScapeGoat</>
					</span>
				</div>
				<div className='ms-2 nav_menu'>
					<Link to='/' className='nav_menu_item'>
						Music
					</Link>
					<Link to='/search' className='nav_menu_item'>
						Search
					</Link>
					<Link to='/note' className='nav_menu_item'>
						Note
					</Link>
				</div>
			</div>
		</div>
	);
}
