import React, { useState } from "react";
import "./Login.css";
import { NormalInputs } from "../ModularComponents/Inputs/Inputs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux-toolkit/LoginSlice";

export default function Login() {
	const dispatch = useDispatch();
	const [loginCred, setLoginCred] = useState({});
	const history = useHistory();
	const onBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(name, value);
		setLoginCred((prev) => {
			const newData = { ...prev };
			newData[name.toLowerCase()] = value;
			return newData;
		});
	};
	const loginHandle = () => {
		if (
			loginCred.email === "admin@admin.com" &&
			loginCred.password === "admin123"
		) {
			dispatch(setLogin(true));
			history.push({
				pathname: "/dashboard",
				state: { admin: true },
			});
		} else {
			dispatch(setLogin(true));
			history.push({
				pathname: "/dashboard",
				state: { admin: false },
			});
		}
	};
	return (
		<div className='login'>
			<div className='login-form'>
				<div className='login-form-head'>
					<h3>LOGIN</h3>
					<p>Please login to proceed</p>
				</div>
				<div className='login-form-body'>
					<NormalInputs
						type='text'
						label={"Email"}
						placeholder='example@gmail.com'
						onBlur={onBlur}
					/>
					<NormalInputs
						type='password'
						label={"Password"}
						placeholder='example : 2131'
						onBlur={onBlur}
					/>
					<div className='d-flex justify-content-center my-2'>
						<button
							onClick={loginHandle}
							className='btn btn-success w-100 py-2'>
							Login
						</button>
					</div>
					<p
						className='text-info d-flex justify-content-center'
						style={{ cursor: "pointer" }}>
						Forget password? click here
					</p>
				</div>
			</div>
		</div>
	);
}
