import { PolygonProps } from "react-leaflet";

export interface Building {
  id: number;
  locationId: number;
  status: string;
  address: string;
  zipcode: string;
  latLng: PolygonProps;
  reception?: {
    phone: string;
  };
  securityPerson?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  contactPerson?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export const EMPTY_BUILIDNG: Building = {
  id: 0,
  locationId: 0,
  status: "",
  address: "",
  zipcode: "",
  latLng: { positions: [] },
  reception: {
    phone: "",
  },
};
