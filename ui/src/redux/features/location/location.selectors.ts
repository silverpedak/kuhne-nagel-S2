import { RootState } from "@/redux/app";

export const selectAllLocationData = (state: RootState) => state.location.entities;
