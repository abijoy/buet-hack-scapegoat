// import React from "react";
import {
	faHamburger,
	faInbox,
	faMapLocation,
	faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.css";
import Map from "../../Map/Map";
import Sidebar from "../../Sidebar/Sidebar";
import { useEffect } from "react";
import { useState } from "react";

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
export default function Dashscreen(props) {
	const [isListening, setIsListening] = useState(false);
	const [note, setNote] = useState(null);
	const [savedNotes, setSavedNotes] = useState([]);
	useEffect(() => {
		handleListen();
	}, [isListening]);
	const handleListen = () => {
		console.log("hearing");
		if (isListening) {
			mic.start();
			mic.onend = () => {
				console.log("continue..");
				mic.start();
			};
		} else {
			mic.stop();

			mic.onend = () => {
				console.log("Stopped Mic on Click");
				handleSaveNote();
			};
		}
		mic.onstart = () => {
			console.log("Mics on");
		};

		mic.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("");
			console.log(transcript);
			setNote(transcript);
			mic.onerror = (event) => {
				console.log(event.error);
			};
		};
	};

	const handleSaveNote = () => {
		// setSavedNotes([...savedNotes, note]);
		setSavedNotes([note]);
		setNote("");
	};
	return (
		<div className='h-100 w-100 d-flex align-items-center justify-content-center '>
			<div className=' d-flex flex-column align-items-center justify-content-center'>
				<div
					className='d-flex flex-column align-items-center justify-content-center'
					style={{ width: "60vw" }}>
					{!isListening ? (
						<h2>Tap and start recording </h2>
					) : (
						<h2>Tap and Stop recording </h2>
					)}
					<div className='d-flex align-items-center justify-content-center'>
						<span
							className={`d-flex align-items-center justify-content-center border ${
								isListening ? "bg-danger" : "bg-dark"
							} text-white`}
							style={{
								width: "50px",
								height: "50px",
								borderRadius: "50%",
							}}
							onClick={() =>
								setIsListening((prevState) => !prevState)
							}>
							<FontAwesomeIcon icon={faMicrophone} />
						</span>
					</div>

					<div style={{ width: "40vw" }}>
						{/* <p>Live text</p> */}
						<p className='text-secondary fw-bold'>{note}</p>
					</div>
					<div className='' style={{ width: "40vw" }}>
						<h2>Notes</h2>
						{savedNotes.map((n) => (
							<p key={n}>{n}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
