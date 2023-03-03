import { XYPosition } from "reactflow";
import { Asset } from "./asset-model.type";

export interface Room {
  id: number;
  floorId: number;
  name: string;
  roomNodeData: RoomNodeData;
  assets: Asset[];
}

export interface RoomNodeData {
  id: number;
  type: string;
  position: XYPosition;
}
