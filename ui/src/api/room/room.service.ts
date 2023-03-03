import { Room } from "@/types/domain/room-model.type";
import { ROOM_ROUTE } from "../api-routes";
import { httpCommon } from "../http-common";

const getRoomsByFloorId = (floorId: number) =>
  httpCommon.get<Room[]>(`${ROOM_ROUTE}?floorId=${floorId}`);

const getRoomById = (roomId: number) => httpCommon.get<Room>(`${ROOM_ROUTE}/${roomId}`);

const updateRoom = (updatedRoom: Room) => {
  const { id } = updatedRoom;
  return httpCommon.put<Room>(`${ROOM_ROUTE}/${id}`, updatedRoom);
};

export const roomService = {
  getRoomsByFloorId,
  getRoomById,
  updateRoom,
};
