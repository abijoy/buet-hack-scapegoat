import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	MapRef: null,
};
export const MapSlice = createSlice({
	name: "Map",
	initialState: initialState,
	reducers: {
		setMapRef: (state, action) => {
			state.MapRef = action.payload;
		},
	},
});
export const { setMapRef } = MapSlice.actions;
export default MapSlice.reducer;
