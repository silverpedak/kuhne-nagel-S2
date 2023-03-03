import { Category } from "./common-domain";

export interface Floor extends Category {
  buildingId: number;
  floorNr: number;
  data?: any;
}

export const EMPTY_FLOOR: Floor = {
  id: 0,
  name: "",
  buildingId: 0,
  floorNr: 0,
};
