import { Building } from "@/types/domain";

import { httpCommon, BUILDING_ROUTE } from "..";

const createBuilding = (newBuilding: Building) => {
  return httpCommon.post<Building>(`${BUILDING_ROUTE}`, newBuilding);
};

const deleteBuilding = (id: number) => httpCommon.delete<Building>(`${BUILDING_ROUTE}/${id}`);

const getBuildingsByLocationId = (locationId: number) => {
  return httpCommon.get<Building[]>(`${BUILDING_ROUTE}?locationId=${locationId}`);
};

const updateBuilding = (updatedBuilding: Building) => {
  const { id } = updatedBuilding;
  return httpCommon.put<Building>(`${BUILDING_ROUTE}/${id}`, updatedBuilding);
};

export const buildingService = {
  createBuilding,
  deleteBuilding,
  getBuildingsByLocationId,
  updateBuilding,
};
