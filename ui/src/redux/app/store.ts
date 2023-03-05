import { configureStore } from "@reduxjs/toolkit";
import { locationReducer, buildingReducer, floorReducer, roomReducer } from "../features";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    building: buildingReducer,
    floor: floorReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
