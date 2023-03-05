import { RootState } from "@/redux/app";

export const selectLocationState = (state: RootState) => state.location;
export const selectAllLocationData = (state: RootState) => state.location.entities;
