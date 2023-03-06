import { EMPTY_FLOOR, Floor } from "@/types/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FloorState {
  entities: Floor[];
  currentEntities: Floor[];
  entity: Floor;
}

const initialState: FloorState = {
  entities: [
    {
      id: 1,
      buildingId: 1,
      floorNr: 1,
      name: "Manufacturing",
      data: {
        performance: "57%",
        occupancy: 25,
        machines: {
          total: 30,
          running: 25,
        },
        alerts: [
          {
            id: 1,
            type: "error",
            text: "Saw_machine_2 error",
          },
          {
            id: 2,
            type: "warning",
            text: "Welding_robot_1 low gas",
          },
          {
            id: 3,
            type: "warning",
            text: "Robot_2 temperature warning",
          },
        ],
      },
    },
    {
      id: 2,
      buildingId: 1,
      floorNr: 2,
      name: "Office",
      data: {
        occupancy: 10,
        performance: "80%",
        alerts: [],
      },
    },
  ],
  currentEntities: [],
  entity: EMPTY_FLOOR,
};

export const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    selectFloor: (state, action: PayloadAction<number>) => {
      state.entity =
        state.entities.find(floor => floor.id === action.payload) || initialState.entity;
    },
    createFloor: (state, action: PayloadAction<Floor>) => {
      state.entities.push(action.payload);
      state.currentEntities.push(action.payload);
    },
    deleteFloor: (state, action: PayloadAction<number>) => {
      state.entities = state.entities.filter(floor => floor.id !== action.payload);
      state.currentEntities = state.currentEntities.filter(floor => floor.id !== action.payload);
    },
    updateFloor: (state, action: PayloadAction<Floor>) => {
      state.entities = state.entities.map(floor => {
        return floor.id === action.payload.id ? { ...floor, ...action.payload } : floor;
      });
      state.currentEntities = state.currentEntities.map(floor => {
        return floor.id === action.payload.id ? { ...floor, ...action.payload } : floor;
      });
    },
    getFloorsByBuildingId: (state, action: PayloadAction<number>) => {
      state.currentEntities = state.entities.filter(floor => floor.buildingId === action.payload);
    },
  },
});

export const floorReducer = floorSlice.reducer;
export const { selectFloor, createFloor, deleteFloor, updateFloor, getFloorsByBuildingId } =
  floorSlice.actions;
