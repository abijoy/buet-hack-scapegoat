import React from "react";
import {
	faHamburger,
	faInbox,
	faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.css";
import Map from "../../Map/Map";
import Sidebar from "../../Sidebar/Sidebar";

export default function Dashscreen(props) {
	return (
		<div className='d-flex flex-column h-100'>
			<div className='Dashnav bg-white' style={{ height: "4rem" }}>
				<nav>
					<div>
						<span className='me-2'>
							<FontAwesomeIcon icon={faInbox} />
						</span>
						<span>Dashboard</span>
					</div>
				</nav>
				<input
					className=' border-0 p-2 '
					type='text'
					placeholder='Search'
					style={{ width: "35%", backgroundColor: "#d3d3d3" }}
				/>
				<div className='text-white'>
					<span className='bg-dark p-2 me-2'>Configure Trip</span>
					<span className='bg-dark p-2 me-2'>
						<FontAwesomeIcon icon={faMapLocation} />
					</span>
					<span className='bg-dark p-2 me-2'>
						<FontAwesomeIcon icon={faHamburger} />
					</span>
				</div>
			</div>
			<div className='d-flex' style={{ flexGrow: 1 }}>
				<div className='col-3 px-2'>
					<Sidebar />
				</div>
				<div className='col-9'>
					<Map />
				</div>
			</div>
		</div>
	);
}
