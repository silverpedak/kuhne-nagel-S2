import { RootState } from "@/redux/app";

export const selectAllFloorsInBuilding = (state: RootState) => state.floor.currentEntities;
export const selectCurrentFloor = (state: RootState) => state.floor.entity;
