import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
	console.log(location.state.admin);
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
						<FontAwesomeIcon
							className='fa-2x'
							icon={faMapMarkerAlt}
						/>
					</span>
					<span className='ms-3 fs-3'>
						<>Vahan 24/7</>
					</span>
				</div>
				<div className='ms-2 nav_menu'>
					<span className='nav_menu_item'>Dashboard</span>
					<span className='nav_menu_item'>Trucks</span>
					<span className='nav_menu_item'>Driver</span>
				</div>
			</div>
			<div className='d-flex align-items-center justify-content-center'>
				<span
					className='me-2 d-inline-flex align-items-center justify-content-center'
					style={{
						width: "2rem",
						height: "2rem",
						borderRadius: "50%",
					}}>
					<FontAwesomeIcon icon={faUserAlt} />
				</span>
				<div
					className='position-relative'
					style={{ cursor: "pointer" }}
					onClick={() => {
						setlogoutShow(!logoutShow);
					}}>
					<span>
						{" "}
						Company Manager <FontAwesomeIcon icon={faAngleDown} />
					</span>
					{logoutShow && (
						<div
							className='position-absolute p-3 bg-info'
							style={{
								width: "100%",
								bottom: -100,
								zIndex: 500,
								left: 0,
							}}>
							<button
								onClick={logout}
								className='btn btn-danger  w-100'>
								LOGOUT
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
