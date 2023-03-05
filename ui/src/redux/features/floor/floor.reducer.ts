import { EMPTY_FLOOR, Floor } from "@/types/domain";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { AppStatusType } from "@/redux/app";

import {
  getFloorsByBuildingId,
  updateFloor,
  deleteFloor,
  createFloor,
  selectFloor,
} from "./floor.actions";

export interface FloorState {
  entities: Floor[];
  entity: Floor;
  status: string;
  error: FloorError | null;
}

export interface FloorError {
  message: string;
  code?: number;
}

const initialState: FloorState = {
  entities: [],
  entity: EMPTY_FLOOR,
  status: AppStatusType.IDLE,
  error: null,
};

export const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createFloor.fulfilled, (floorState, action: PayloadAction<Floor>) => {
        floorState.status = AppStatusType.COMPLETE;
        floorState.entities.push(action.payload);
        floorState.entity = action.payload;
        floorState.error = null;
      })
      .addCase(deleteFloor.fulfilled, (floorState, action: PayloadAction<number>) => {
        floorState.status = AppStatusType.COMPLETE;
        floorState.entities = floorState.entities.filter(floor => floor.id !== action.payload);
        floorState.error = null;
      })
      .addCase(getFloorsByBuildingId.fulfilled, (floorState, action: PayloadAction<Floor[]>) => {
        floorState.status = AppStatusType.COMPLETE;
        floorState.entities = action.payload;
        floorState.error = null;
      })
      .addCase(updateFloor.fulfilled, (floorState, action: PayloadAction<Floor>) => {
        floorState.status = AppStatusType.COMPLETE;
        floorState.entities = floorState.entities.map(floor => {
          return floor.id === action.payload.id ? { ...floor, ...action.payload } : floor;
        });
        floorState.entity = action.payload;
        floorState.error = null;
      })
      .addCase(selectFloor, (floorState, action: PayloadAction<Floor>) => {
        floorState.entity = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createFloor.pending,
          deleteFloor.pending,
          updateFloor.pending,
          getFloorsByBuildingId.pending
        ),
        floorState => {
          floorState.status = AppStatusType.LOADING;
        }
      )
      .addMatcher(
        isAnyOf(
          createFloor.rejected,
          deleteFloor.rejected,
          updateFloor.rejected,
          getFloorsByBuildingId.rejected
        ),
        (floorState, { error }) => {
          floorState.status = AppStatusType.ERROR;
          floorState.error = error as FloorError;
        }
      );
  },
});

export const floorReducer = floorSlice.reducer;
