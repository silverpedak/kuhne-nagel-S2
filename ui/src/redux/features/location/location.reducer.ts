import { Location } from "@/types/domain";
import { createSlice } from "@reduxjs/toolkit";

export interface LocationState {
  entities: Location[];
  entity: Location | null;
}

const initialState: LocationState = {
  entities: [
    {
      id: 1,
      title: "Tallinn Office",
      address: "Peterburi tee 5",
      zipcode: null,
      country: "Estonia",
      owner: {
        id: 0,
        name: "Our Premises",
      },
      longitude: 24.80849,
      latitude: 59.42467,
      typeId: 1,
    },
  ],
  entity: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
});

export const locationReducer = locationSlice.reducer;
