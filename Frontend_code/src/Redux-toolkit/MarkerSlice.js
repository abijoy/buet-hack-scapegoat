import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allMarkers: [],
};

export const MarkerSlice = createSlice({
	name: "markers",
	initialState,
	reducers: {
		setMarkers: (state, action) => {
			state.allMarkers = [...action.payload];
		},
	},
});

export const { setMarkers } = MarkerSlice.actions;
export default MarkerSlice.reducer;
