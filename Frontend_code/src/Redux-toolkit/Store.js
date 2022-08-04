import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import MapSlice from "./MapSlice";
import MarkerSlice from "./MarkerSlice";

export const store = configureStore({
	reducer: {
		isLoggedIn: loginSlice,
		allMarkers: MarkerSlice,
		MapRef: MapSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
