import { Location } from "@/types/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppStatusType } from "@/redux/app";

import { getAllLocations } from "./location.actions";

export interface LocationState {
  entities: Location[];
  entity: Location | null;
  status: string;
  error: LocationError | null;
}

export interface LocationError {
  message: string;
  code?: number;
}

const initialState: LocationState = {
  entities: [],
  entity: null,
  status: AppStatusType.IDLE,
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllLocations.fulfilled, (locationState, action: PayloadAction<Location[]>) => {
        locationState.status = AppStatusType.COMPLETE;
        locationState.entities = action.payload;
        locationState.error = null;
      })
      .addCase(getAllLocations.pending, locationState => {
        locationState.status = AppStatusType.LOADING;
      })
      .addCase(getAllLocations.rejected, (locationState, { error }) => {
        locationState.status = AppStatusType.ERROR;
        locationState.error = error as LocationError;
      });
  },
});

export const locationReducer = locationSlice.reducer;
