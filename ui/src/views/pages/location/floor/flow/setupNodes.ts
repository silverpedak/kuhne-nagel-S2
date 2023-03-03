import { Node, Position } from "reactflow";

import { AssetType } from "@/common/consts";
import { Room } from "@/types/domain";

export const setupNodes = (rooms: Room[]): Node[] => {
  return rooms.flatMap(room => {
    const roomNode = {
      id: room.roomNodeData.id.toString(),
      data: room,
      type: AssetType.Room,
      position: room.roomNodeData.position,
      selectable: false,
      draggable: false,
      zIndex: -1,
    };
    const assets = room.assets.map(asset => ({
      id: asset.id.toString(),
      data: asset,
      position: asset.position,
      type: asset.type.toLowerCase(),
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      parentNode: roomNode.id.toString(),
      zIndex: 1,
    }));
    return [roomNode, ...assets];
  });
};
