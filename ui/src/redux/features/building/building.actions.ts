import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppActionType } from "@/redux/app";
import { buildingService } from "@/api";
import { handleError } from "@/common/api-error-handler";
import { Building } from "@/types/domain";

export const getBuildingsByLocationId = createAsyncThunk(
  AppActionType.GET_BUILDINGS,
  async (buildingId: number) => {
    try {
      const { data } = await buildingService.getBuildingsByLocationId(buildingId);
      return await Promise.resolve(data);
    } catch (err) {
      handleError(err);
      return await Promise.reject(err);
    }
  }
);

export const selectBuilding = createAction<Building>(AppActionType.SELECT_BUILDING);
