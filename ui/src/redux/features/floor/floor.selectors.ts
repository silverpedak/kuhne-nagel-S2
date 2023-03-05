import { RootState } from "@/redux/app";

export const selectFloorState = (state: RootState) => state.floor;
export const selectAllFloorsData = (state: RootState) => state.floor.entities;
export const selectCurrentFloor = (state: RootState) => state.floor.entity;
