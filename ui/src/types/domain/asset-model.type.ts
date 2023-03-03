import { Edge, XYPosition } from "reactflow";
import { Category } from "./common-domain";

export interface Asset extends Category {
  type: string;
  position: XYPosition;
  width?: number;
  height?: number;
  roomId: number;
  connections: Edge[];
  data?: AssetData;
}

export interface AssetData {
  state?: string;
  status?: string;
  temperature?: number;
  image?: string;
}

export const EMPTY_ASSET: Asset = {
  id: 0,
  type: "",
  position: {
    x: 0,
    y: 0,
  },
  name: "",
  connections: [],
  roomId: 0,
};
