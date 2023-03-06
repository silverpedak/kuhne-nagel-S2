import { createAsyncThunk } from "@reduxjs/toolkit";

import { roomService } from "@/api";
import { handleError } from "@/common/api-error-handler";
import { Room } from "@/types/domain";

import { AppActionType } from "@/redux/app";

export const getRoomsByFloorId = createAsyncThunk(
  AppActionType.GET_ROOMS,
  async (id: number): Promise<Room[]> => {
    try {
      const { data } = await roomService.getRoomsByFloorId(id);
      return Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);

export const updateRoom = createAsyncThunk(
  AppActionType.UPDATE_ROOM,
  async (updatedRoom: Room): Promise<Room> => {
    try {
      const { data } = await roomService.updateRoom(updatedRoom);
      return Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);
