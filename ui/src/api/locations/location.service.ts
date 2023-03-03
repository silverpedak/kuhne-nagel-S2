import { Location } from "@/types/domain";
import { LocationSearchQuery } from "@/types/ui/location-ui";
import { httpCommon, LOCATION_ROUTE } from "..";

const searchLocations = (queryParams: LocationSearchQuery) => {
  return httpCommon.get<Location[]>(`${LOCATION_ROUTE}?${queryObjectToFilter(queryParams)}`);
};

const findAllLocations = () => httpCommon.get<Location[]>(`${LOCATION_ROUTE}`);

const getLocationById = (id: number) => httpCommon.get<Location>(`${LOCATION_ROUTE}/${id}`);

const updateLocation = (updatedLocation: Location) => {
  const { id } = updatedLocation;
  return httpCommon.put<Location>(`${LOCATION_ROUTE}/${id}`, updatedLocation);
};

const createLocation = (newLocation: Location) => {
  return httpCommon.post<Location>(`${LOCATION_ROUTE}`, newLocation);
};

const deleteLocation = (id: number) => httpCommon.delete<Location>(`${LOCATION_ROUTE}/${id}`);

const queryObjectToFilter = (queryParams: LocationSearchQuery) => {
  const filters = Object.assign(
    {},
    queryParams.title && queryParams.title !== "" ? { title: queryParams.title } : null,
    queryParams.country && queryParams.country !== "" ? { country: queryParams.country } : null,
    queryParams.zipcode && queryParams.zipcode !== "" ? { zipcode: queryParams.zipcode } : null,
    queryParams.ownerId && queryParams.ownerId !== "" ? { ownerId: queryParams.ownerId } : null,
    queryParams.typeId && queryParams.typeId !== "" ? { typeId: queryParams.typeId } : null
  );
  return new URLSearchParams(filters);
};

export const locationService = {
  findAllLocations,
  getLocationById,
  updateLocation,
  createLocation,
  deleteLocation,
  searchLocations,
};
