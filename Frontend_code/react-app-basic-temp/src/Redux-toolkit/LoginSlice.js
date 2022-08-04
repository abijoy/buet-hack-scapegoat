import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
};

export const loginSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
