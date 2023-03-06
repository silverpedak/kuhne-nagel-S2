import { createAsyncThunk } from "@reduxjs/toolkit";

import { locationService } from "@/api";
import { handleError } from "@/common/api-error-handler";

import { AppActionType } from "@/redux/app";

export const getAllLocations = createAsyncThunk(AppActionType.GET_LOCATIONS, async () => {
  try {
    const { data } = await locationService.findAllLocations();
    return await Promise.resolve(data);
  } catch (err) {
    handleError(err);
    return await Promise.reject(err);
  }
});
