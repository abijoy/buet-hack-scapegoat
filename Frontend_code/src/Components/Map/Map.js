import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
// import "./App.css";
import { Marker } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Home";
import {
	GoogleMap,
	LoadScript,
	InfoWindow,
	useJsApiLoader,
} from "@react-google-maps/api";
// import VehicleDetailsModal from "./Components/VehicleDetailsModal/VehicleDetailsModal";
import VehicleDetailsModal from "../VehicleDetailsModal/VehicleDetailsModal";
import { store } from "../../Redux-toolkit/Store";
import { useDispatch, useSelector } from "react-redux";
import { setMarkers } from "../../Redux-toolkit/MarkerSlice";
import { setMapRef } from "../../Redux-toolkit/MapSlice";

const containerStyle = {
	width: "100%",
	height: "100%",
};

function Map() {
	const [coordinates, setCoordinates] = useState(null);
	const [coordinates2, setCoordinates2] = useState(null);
	const [markerList, setMarker] = useState([]);
	const [start, setStart] = useState(null);
	const [start1, setStart1] = useState(null);
	const [center, setcenter] = useState(null);
	const [details, setDetails] = useState(null);
	const [source, setSource] = useState([]);
	const [destination, setDestination] = useState([]);
	const [VehicleDetailsModalshow, setVehicleDetailsModal] =
		React.useState(false);
	const [map, setMap] = React.useState(/** @type google.maps.Map */ (null));
	// const { allMarkers } = useSelector((state) => state.allMarkers);
	// const { MapRef } = useSelector((state) => state.MapRef);
	const dispatch = useDispatch();

	// var directionsService = new google.maps.DirectionsService();
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyD81s0fJ7X2KeC1tqnJkDLmXku6vY6Zf5o",
	});
	const onLoad = React.useCallback(function callback(map) {
		// const bounds = new window.google.maps.LatLngBounds(start_point);
		// map.fitBounds(bounds);
		dispatch(setMapRef(map));
		setMap(map);
	}, []);
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);
	const onLoads = (marker, content) => {
		console.log("marker: ", marker);
		const infowindow = new window.google.maps.InfoWindow({
			content: `<h1>${content}</h1>`,
		});
		marker.addListener("click", () => infowindow.open(map, marker));
	};

	useEffect(() => {
		fetch("/sirTrack2.geojson")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const coordinateData = data.features[0].geometry.coordinates[0];
				const coordinateData2 =
					data.features[0].geometry.coordinates[1];

				setCoordinates(coordinateData);
				setCoordinates2(coordinateData2);
				const start = {
					lng: coordinateData[0][0],
					lat: coordinateData[0][1],
				};
				const start1 = {
					lng: coordinateData2[0][0],
					lat: coordinateData2[0][1],
				};
				console.log(start1);
				const Marker = [
					{
						position: start,
						icon: "https://purepng.com/public/uploads/large/yellow-truck-n1f.png",
						info: "<div><h2>Marker 1</h2><p>Truck no : 1<br/> Driver : Saman</p></div>",
						company: "Flipcart Ltd.",
						title: "Marker 1",
						driver: "Saman",
						License: "Sa1545465",
						Start: "Tudo tech",
						end: "My home",
						startDate: "11/06/22",
						endDate: "15/06/22",
					},
					{
						position: start1,
						icon: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
						info: "<div><h2>Marker 2</h2><p>Truck no : 2<br/> Driver : Zahin</p></div>",
						company: "Amazon Ltd.",
						title: "Marker 2",
						driver: "Arvin",
						License: "Ar15424652",
						Start: "Tudo tech",
						end: "My home",
						startDate: "11/06/22",
						endDate: "15/06/22",
					},
					{
						position: {
							lat: 19.228825,
							lng: 72.854118,
						},
						icon: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
						info: "<div><h2>Marker 2</h2><p>Truck no : 2<br/> Driver : Zahin</p></div>",
						company: "Apple pvt. Ltd.",
						title: "Mumbai",
						driver: "Zahin",
						License: "Za1545465",
						Start: "Goa",
						end: "Mumbai",
						startDate: "11/06/22",
						endDate: "15/06/22",
					},
					{
						position: { lat: 15.496777, lng: 73.827827 },
						icon: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
						info: "<div><h2>Marker 2</h2><p>Truck no : 2<br/> Driver : Zahin</p></div>",
						company: "VN Cosmetics",
						title: "Goa",
						driver: "Puja",
						License: "Pu1545465",
						Start: "Goa",
						end: "Mumbai",
						startDate: "11/06/22",
						endDate: "15/06/22",
					},
				];
				// console.log(start);
				// try {
				// 	dispatch(setMarkers(Marker));
				// } catch (error) {
				// 	console.log(error);
				// }
				setMarker(Marker);
				setcenter(start);
				setStart(start);
				setStart1(start1);
			});
	}, [isLoaded]);
	const handleDetailsModal = (details, marker) => {
		const newDetails = details;
		newDetails.lng = marker.position.lng();
		newDetails.lat = marker.position.lat();
		setDetails(newDetails);
		setVehicleDetailsModal(true);
	};
	// create marker on google map

	const createMarker = (markerObj) => {
		// eslint-disable-next-line no-undef
		const marker = new google.maps.Marker({
			position: markerObj.position,
			map: map,
			icon: {
				url: markerObj.icon,
				// set marker width and height
				// eslint-disable-next-line no-undef
				scaledSize: new google.maps.Size(50, 50),
			},
			title: markerObj.title,
		});

		// eslint-disable-next-line no-undef
		const InfoWindowContent = (
			<div style={{ width: "max-content", height: "max-content" }}>
				<div id='driverName'>
					<span>Driver : {markerObj.driver}</span>
				</div>
				<div id='licenceNo'>
					<span>License No. : {markerObj.License}</span>
				</div>
			</div>
		);
		const content = ReactDOMServer.renderToString(InfoWindowContent);
		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: content,
		});

		marker.addListener("click", () => infowindow.open(map, marker));
		marker.addListener("dblclick", () => {
			handleDetailsModal(markerObj, marker);
		});

		return marker;
	};
	let m = [];
	useEffect(() => {
		console.log(coordinates, isLoaded);
		if (isLoaded && map != null) {
			dispatch(setMarkers(markerList));
			// alert("hello");
			// eslint-disable-next-line no-undef
			var bounds = new google.maps.LatLngBounds();
			let sources = [];
			let destinations = [];
			markerList.map((x, id) => {
				console.log(source.includes(x.Start), x.Start, source);
				if (!sources.includes(x.Start)) {
					sources = [...sources, x.Start];
				}
				if (!destinations.includes(x.end)) {
					destinations = [...destinations, x.end];
				}
				setSource((prev) => {
					const newSources = [...sources];
					return newSources;
				});
				setDestination((prev) => {
					const newDestination = [...destinations];
					return newDestination;
				});
				const marker = createMarker(x);
				m.push({ marker, id });
				console.log(marker.position.lat());
				// eslint-disable-next-line no-undef
				const latLng = new google.maps.LatLng(
					marker.position.lat(),
					marker.position.lng()
				);
				bounds.extend(latLng);
			});
			map.fitBounds(bounds);
			if (coordinates != null && coordinates2 != null && isLoaded) {
				const len = coordinates.length;
				let i = 0;
				setTimeout(() => {
					const interval = setInterval(() => {
						let newPosition;
						if (i < len) {
							newPosition = {
								lng: coordinates[i][0],
								lat: coordinates[i][1],
							};
							// setStart(start);
							let newData;
							m[0]?.marker.setPosition(newPosition);
							if (m[0]?.marker !== undefined) {
								setMarker((prev) => {
									newData = [...prev];
									newData[m[0]?.id]["position"] = newPosition;

									return newData;
								});
							}
							if (i === len - 1) {
								m[0]?.marker.setIcon({
									url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/14210/traffic-collision-clipart-md.png",
									// set marker width and height
									// eslint-disable-next-line no-undef
									scaledSize: new google.maps.Size(50, 50),
								});
							}
						}
						newPosition = {
							lng: coordinates2[i][0],
							lat: coordinates2[i][1],
						};

						// setStart1(start1);
						m[1]?.marker.setPosition(newPosition);
						if (m[1]?.marker != undefined) {
							setMarker((prev) => {
								const newData = [...prev];
								newData[m[1]?.id]["position"] = newPosition;

								return newData;
							});
						}
						if (i === coordinates2.length - 1) {
							m[1]?.marker.setIcon({
								url: "https://cdn.pixabay.com/photo/2012/04/24/13/12/motorcycle-40000_960_720.png",
								// set marker width and height
								// eslint-disable-next-line no-undef
								scaledSize: new google.maps.Size(50, 50),
							});
							clearInterval(interval);
						}
						// dispatch(setMarkers([...markerList]));
						i += 1;
					}, 500);
				}, 5000);
			}
		}
	}, [map, coordinates, coordinates2, isLoaded]);

	const handleSingleCLick = (e) => {
		console.log("clicked", e);
	};

	const FilterTheMarker = (StartPoint, destination) => {
		const filteredMarker = markerList.filter(
			(item) => item.Start === StartPoint && item.end === destination
		);
		return filteredMarker;
	};
	const MapNewBoundSet = (filteredMarker, bounds) => {
		filteredMarker.forEach((item) => {
			bounds.extend(item.position);
		});
	};
	const FilterMarkerBound = async () => {
		var bounds = new window.google.maps.LatLngBounds();
		var StartPoint = document.getElementById("source").value;
		var destination = document.getElementById("destination").value;
		try {
			const filteredMarker = await FilterTheMarker(
				StartPoint,
				destination
			);
			if (filteredMarker.length > 0) {
				MapNewBoundSet(filteredMarker, bounds);
				map.fitBounds(bounds);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		// <Home />

		isLoaded ? (
			<>
				<VehicleDetailsModal
					details={details}
					show={VehicleDetailsModalshow}
					onHide={() => setVehicleDetailsModal(false)}
				/>
				<GoogleMap
					onLoad={onLoad}
					onUnmount={onUnmount}
					mapContainerStyle={containerStyle}
					// center={center}
					zoom={10}>
					<div
						className='position-absolute'
						style={{ left: "15rem" }}>
						<select
							name='source'
							id='source'
							onChange={FilterMarkerBound}>
							<option value='' disabled selected>
								Select Source
							</option>

							{source.map((item, id) => {
								return (
									<option key={`source` + id} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div
						className='position-absolute'
						style={{ left: "35rem" }}>
						<select
							name='source'
							id='destination'
							onChange={FilterMarkerBound}>
							<option value='destination' disabled selected>
								Select Destination
							</option>
							{destination.map((item, id) => {
								return (
									<option
										key={`destination` + id}
										value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					{/* Child components, such as markers, info windows, etc. */}
				</GoogleMap>
			</>
		) : (
			<></>
		)
	);
}

export default React.memo(Map);
