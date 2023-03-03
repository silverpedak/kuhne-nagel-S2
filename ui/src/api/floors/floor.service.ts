import { Floor } from "@/types/domain";
import { httpCommon, FLOOR_ROUTE } from "..";

const createFloor = (newFloor: Floor) => {
  return httpCommon.post<Floor>(`${FLOOR_ROUTE}`, newFloor);
};

const deleteFloor = (id: number) => httpCommon.delete<Floor>(`${FLOOR_ROUTE}/${id}`);

const getFloorsByBuildingId = (buildingId: number) =>
  httpCommon.get<Floor[]>(`${FLOOR_ROUTE}?buildingId=${buildingId}`);

const updateFloor = (updatedFloor: Floor) => {
  const { id } = updatedFloor;
  return httpCommon.put<Floor>(`${FLOOR_ROUTE}/${id}`, updatedFloor);
};

export const floorsService = {
  getFloorsByBuildingId,
  createFloor,
  deleteFloor,
  updateFloor,
};
