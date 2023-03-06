import { Building, EMPTY_BUILIDNG } from "@/types/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppStatusType } from "@/redux/app";

import { getBuildingsByLocationId, selectBuilding } from "./building.actions";

export interface BuildingState {
  entities: Building[];
  entity: Building;
  status: string;
  error: BuildingError | null;
}

export interface BuildingError {
  message: string;
  code?: number;
}

const initialState: BuildingState = {
  entities: [],
  entity: EMPTY_BUILIDNG,
  status: AppStatusType.IDLE,
  error: null,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getBuildingsByLocationId.fulfilled,
        (buildingState, action: PayloadAction<Building[]>) => {
          buildingState.status = AppStatusType.COMPLETE;
          buildingState.entities = action.payload;
          buildingState.error = null;
        }
      )
      .addCase(getBuildingsByLocationId.pending, buildingState => {
        buildingState.status = AppStatusType.LOADING;
      })
      .addCase(getBuildingsByLocationId.rejected, (buildingState, { error }) => {
        buildingState.status = AppStatusType.ERROR;
        buildingState.error = error as BuildingError;
      })
      .addCase(selectBuilding, (buildingState, action: PayloadAction<Building>) => {
        buildingState.entity = action.payload;
      });
  },
});

export const buildingReducer = buildingSlice.reducer;
