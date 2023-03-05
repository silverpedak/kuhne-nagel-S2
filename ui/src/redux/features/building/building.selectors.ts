import { RootState } from "@/redux/app";

export const selectBuildingState = (state: RootState) => state.building;
export const selectAllBuildingsData = (state: RootState) => state.building.entities;
export const selectCurrentBuilding = (state: RootState) => state.building.entity;
