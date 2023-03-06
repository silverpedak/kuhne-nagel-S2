import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { floorsService } from "@/api";
import { handleError } from "@/common/api-error-handler";
import { Floor } from "@/types/domain";
import { alerts } from "@/views/components/feedback";

import { AppActionType } from "@/redux/app";

export const getFloorsByBuildingId = createAsyncThunk(
  AppActionType.GET_FLOORS,
  async (id: number): Promise<Floor[]> => {
    try {
      const { data } = await floorsService.getFloorsByBuildingId(id);
      return Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);

export const createFloor = createAsyncThunk(
  AppActionType.CREATE_FLOOR,
  async (newFloor: Floor): Promise<Floor> => {
    try {
      const { data } = await floorsService.createFloor(newFloor);
      alerts.successAlert("Created!");
      return Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);

export const deleteFloor = createAsyncThunk(
  AppActionType.DELETE_FLOOR,
  async (id: number): Promise<number> => {
    try {
      await floorsService.deleteFloor(id);
      alerts.successAlert("Deleted!");
      return Promise.resolve(id);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);

export const updateFloor = createAsyncThunk(
  AppActionType.UPDATE_FLOOR,
  async (updatedFloor: Floor): Promise<Floor> => {
    try {
      const { data } = await floorsService.updateFloor(updatedFloor);
      alerts.successAlert("Updated!");
      return Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return Promise.reject(err);
    }
  }
);

export const selectFloor = createAction<Floor>(AppActionType.SELECT_FLOOR);
