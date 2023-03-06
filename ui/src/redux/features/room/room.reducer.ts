import { Room } from "@/types/domain";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { AppStatusType } from "@/redux/app";

import { getRoomsByFloorId, updateRoom } from "./room.actions";

export interface RoomState {
  entities: Room[];
  entity: Room | null;
  status: string;
  error: RoomError | null;
}

export interface RoomError {
  message: string;
  code?: number;
}

const initialState: RoomState = {
  entities: [],
  entity: null,
  status: AppStatusType.IDLE,
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRoomsByFloorId.fulfilled, (roomState, action: PayloadAction<Room[]>) => {
        roomState.status = AppStatusType.COMPLETE;
        roomState.entities = action.payload;
        roomState.error = null;
      })
      .addCase(updateRoom.fulfilled, (roomState, action: PayloadAction<Room>) => {
        roomState.status = AppStatusType.COMPLETE;
        roomState.entities = roomState.entities.map(room => {
          return room.id === action.payload.id ? { ...room, ...action.payload } : room;
        });
        roomState.entity = action.payload;
        roomState.error = null;
      })
      .addMatcher(isAnyOf(updateRoom.pending, getRoomsByFloorId.pending), roomState => {
        roomState.status = AppStatusType.LOADING;
      })
      .addMatcher(
        isAnyOf(updateRoom.rejected, getRoomsByFloorId.rejected),
        (roomState, { error }) => {
          roomState.status = AppStatusType.ERROR;
          roomState.error = error as RoomError;
        }
      );
  },
});

export const roomReducer = roomSlice.reducer;
