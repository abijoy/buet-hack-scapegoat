import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faPhone,
	faTruck,
	faPencil,
	faTrash,
	faBell,
	faMapMarkerAlt,
	faCross,
	faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs } from "react-bootstrap";

export default function Sidebar() {
	const { allMarkers } = useSelector((state) => state.allMarkers);
	const [currentId, setCurrentId] = useState(null);
	const [prevActiveId, setPrevActiveId] = useState(null);
	const [key, setKey] = useState("Tracking");
	const { MapRef } = useSelector((state) => state.MapRef);
	// allMarkers = JSON.parse(allMarkers);
	// console.log(allMarkers);
	// useEffect(() => {}, []);
	const variants = {
		visible: { opacity: 1, x: "215px" },
		hidden: { opacity: 0, x: "0%" },
	};
	const controlAnimation = useAnimation();

	const slidebarOpen = (id) => {
		if (prevActiveId == null) {
			setPrevActiveId("marker-" + id);
			const swithToActive = document.querySelector(
				`[data-markerId=${"marker-" + id}]`
			);
			swithToActive.classList.add("active");
		} else {
			setPrevActiveId("marker-" + id);
			const swithToNotActive = document.querySelector(
				`[data-markerId=${prevActiveId}]`
			);
			swithToNotActive.classList.remove("active");

			const swithToActive = document.querySelector(
				`[data-markerId=${"marker-" + id}]`
			);
			swithToActive.classList.add("active");
		}
		controlAnimation.start({
			x: 215,
			opacity: 1,
		});
		setCurrentId(id);
	};
	const slidebarClose = () => {
		const swithToNotActive = document.querySelector(
			`[data-markerId=${prevActiveId}]`
		);
		swithToNotActive.classList.remove("active");
		controlAnimation.start({
			x: -500,
			opacity: 0,
		});
	};
	const centerFocusedMarker = (e, id) => {
		e.stopPropagation();
		const pos = allMarkers[id].position;
		// console.log(MapRef);
		MapRef?.setCenter(pos);
		MapRef?.setZoom(10);
	};
	return (
		<div
			className='border p-2 h-100 position-relative'
			style={{ zIndex: 1 }}>
			<p className='text-center'>Active trip</p>
			<div style={{ overflowY: "scroll" }}>
				{/*
                ===========================
                sidebar track marker list 
                ===========================
                */}

				{allMarkers?.map((item, id) => (
					<div
						key={"marker-" + id}
						data-markerId={"marker-" + id}
						onClick={() => slidebarOpen(id)}
						className='markers  my-2 '
						style={{ cursor: "pointer", zIndex: 2 }}>
						<div className='d-flex '>
							<div className='text-white truckLogo me-3'>
								<FontAwesomeIcon icon={faTruck} />
							</div>
							<div
								className='d-flex flex-column'
								style={{
									flexGrow: 1,
								}}>
								<div
									className='d-flex flex-column'
									style={{
										borderBottom: "1px solid #d3d3d3",
									}}>
									<span>Vss - {item.License}</span>
									<small>
										{item.Start} - {item.end}
									</small>
									<small>{item.company}</small>
								</div>
								<div
									// style={{ zIndex: 100 }}
									className='d-flex align-item-center justify-content-between my-2'>
									<span>
										<FontAwesomeIcon icon={faPencil} />
									</span>
									<span>
										<FontAwesomeIcon icon={faTrash} />
									</span>
									<span>
										<FontAwesomeIcon icon={faBell} />
									</span>
									<span
										onClick={(e) =>
											centerFocusedMarker(e, id)
										}>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
										/>
									</span>
									<span>
										<FontAwesomeIcon
											title='sos'
											icon={faCircle}></FontAwesomeIcon>
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* 
            ========================
            Sliding bar on click 
            ========================
            */}
			<motion.div
				className='slidingBar'
				initial={{ opacity: 1, x: -500 }}
				animate={controlAnimation}>
				<div className='d-flex align-items-center '>
					<span
						style={{ cursor: "pointer" }}
						onClick={slidebarClose}
						className='me-2'>
						<FontAwesomeIcon icon={faAngleLeft} />
					</span>
					<span>{allMarkers[currentId]?.License}</span>
				</div>
				<div className='d-flex flex-wrap align-items-center justify-content-between'>
					<div className='d-flex flex-column p-1'>
						<small className='text-secondary'>Source</small>
						<span className='slideText'>
							{allMarkers[currentId]?.Start}
						</span>
					</div>
					<div className='d-flex flex-column p-1'>
						<small className='text-secondary'>Destination</small>
						<span className='slideText'>
							{allMarkers[currentId]?.end}
						</span>
					</div>
					<div className='d-flex flex-column p-1'>
						<small className='text-secondary'>Client</small>
						<span className='slideText'>
							{allMarkers[currentId]?.company}
						</span>
					</div>
					<div className='d-flex flex-column p-1'>
						<small className='text-secondary'>Start Date</small>
						<span className='slideText'>
							{allMarkers[currentId]?.startDate}
						</span>
					</div>
					<div className='d-flex flex-column p-1'>
						<small className='text-secondary'>End Date</small>
						<span className='slideText'>
							{allMarkers[currentId]?.endDate}
						</span>
					</div>
				</div>
				<div className='py-2 d-flex align-items-center justify-content-between'>
					<span className='slideText text-secondary'>
						Driver Name
					</span>
					<div>
						<a className='me-2'>{allMarkers[currentId]?.driver}</a>
						<span>
							<FontAwesomeIcon icon={faPhone} />
						</span>
					</div>
				</div>
				<div className=''>
					<Tabs
						id='controlled-tab-example'
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className='mb-3'>
						<Tab eventKey='Tracking' title='Tracking'>
							<div className='d-flex align-items-center justify-content-end'>
								<span className='text-secondary slideText me-2'>
									Update 5 min ago
								</span>
								<span className='btn btn-secondary slideText'>
									Refresh
								</span>
							</div>
						</Tab>
						<Tab eventKey='TruckDetails' title='Truck Details'>
							Truck Details
						</Tab>
					</Tabs>
				</div>
			</motion.div>
		</div>
	);
}
