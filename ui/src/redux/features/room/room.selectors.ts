import { RootState } from "@/redux/app";

export const selectRoomState = (state: RootState) => state.room;
export const selectAllRoomsData = (state: RootState) => state.room.entities;
