import { Edge } from "reactflow";

import { Room } from "@/types/domain";
import { AssetType } from "@/common/consts";

export const setupEdges = (rooms: Room[]): Edge[] => {
  return rooms.flatMap(room => {
    const filteredAssets = room.assets.filter(asset => asset.type !== AssetType.Room);
    return filteredAssets.flatMap(asset => asset.connections);
  });
};
