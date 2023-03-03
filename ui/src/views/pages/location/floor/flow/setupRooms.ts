import { Edge, Node } from "reactflow";

import { Room } from "@/types/domain";

export const setupRooms = (nodes: Node[], edges: Edge[], rooms: Room[]): Room[] => {
  return rooms.map(room => {
    const nodesInRoom = nodes.filter(node => node.parentNode === room.roomNodeData.id.toString());
    room.assets = nodesInRoom.map(node => ({
      ...node.data,
      position: node.position,
      connections: edges.filter(edge => edge.source === node.data.id.toString()),
    }));
    return room;
  });
};
