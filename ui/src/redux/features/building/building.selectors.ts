import { RootState } from "@/redux/app";

export const selectCurrentBuildingsData = (state: RootState) => state.building.currentEntities;
export const selectCurrentBuilding = (state: RootState) => state.building.entity;
