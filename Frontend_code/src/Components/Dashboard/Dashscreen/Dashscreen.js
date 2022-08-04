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
		setSavedNotes(note);
		// setOurText(note);
		speechHandler(msg, note);
		setNote("");
	};
	const [ourText, setOurText] = useState("");
	const msg = new SpeechSynthesisUtterance();

	const speechHandler = (msg, note) => {
		msg.text =
			"Start Address: Dhanmondi, Dhaka 1205, Bangladesh End Address: Jigatola, Dhaka 1205, Bangladesh STEP 1 Head <b>southeast</b> on <b>Rd No. 8A</b> toward <b>Rd 8/<wbr/>A</b> STEP 2 Turn <b>right</b> after Eduaid-Bangladesh office (on the right) STEP 3 Turn <b>left</b> onto <b>Satmasjid Road</b> STEP 4 Make a <b>U-turn</b> at <b>Rd No. 5/<wbr/>A</b> STEP 5 Turn <b>left</b> onto <b>Rd No 5/<wbr/>A</b>";
		window.speechSynthesis.speak(msg);
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
					{/* <input
						type='text'
						value={ourText}
						placeholder='Enter Text'
						onChange={(e) => setOurText(e.target.value)}
					/> */}
					<button onClick={() => speechHandler(msg)}>SPEAK</button>
					<div className='' style={{ width: "40vw" }}>
						<h2>Notes</h2>
						<p>{savedNotes}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
