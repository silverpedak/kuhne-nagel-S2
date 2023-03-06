import { RootState } from "@/redux/app";

export const selectCurrentRoomsData = (state: RootState) => state.room.currentEntities;
export const selectCurrentAsset = (state: RootState) => state.room.currentAsset;
