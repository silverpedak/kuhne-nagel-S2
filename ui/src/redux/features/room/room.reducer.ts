import { Asset, EMPTY_ASSET, Room } from "@/types/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomState {
  entities: Room[];
  currentEntities: Room[];
  entity: Room | null;
  currentAsset: Asset;
}

const initialState: RoomState = {
  entities: [
    {
      id: 1,
      floorId: 1,
      name: "Manufacturing Room 1",
      roomNodeData: {
        id: 1,
        type: "room",
        position: {
          x: 0,
          y: 0,
        },
      },
      assets: [
        {
          id: 3,
          roomId: 1,
          type: "machine",
          name: "machine_1",
          position: {
            x: 45,
            y: 85,
          },
          connections: [],
          data: {
            status: "running",
            state: "operational",
          },
        },
        {
          id: 4,
          roomId: 1,
          type: "machine",
          name: "machine_2",
          position: {
            x: 135,
            y: 85,
          },
          connections: [],
          data: {
            status: "running",
            state: "operational",
            temperature: 30,
          },
        },
        {
          id: 5,
          roomId: 1,
          type: "machine",
          name: "machine_3",
          position: {
            x: 225,
            y: 85,
          },
          connections: [],
          data: {
            status: "running",
            state: "warning",
            temperature: 40,
          },
        },
        {
          id: 6,
          roomId: 1,
          type: "machine",
          name: "machine_4",
          position: {
            x: 315,
            y: 85,
          },
          connections: [
            {
              animated: true,
              id: "reactflow__edge-5a-6",
              source: "5",
              sourceHandle: "a",
              target: "6",
            },
          ],
          data: {
            status: "stopped",
            state: "error",
            temperature: 50,
          },
        },
        {
          id: 7,
          roomId: 1,
          type: "machine",
          name: "machine_5",
          position: {
            x: 405,
            y: 85,
          },
          connections: [],
          data: {
            status: "idle",
            state: "operational",
            temperature: 20,
          },
        },
      ],
    },
    {
      id: 3,
      floorId: 2,
      name: "Office",
      roomNodeData: {
        id: 1,
        type: "room",
        position: {
          x: 0,
          y: 0,
        },
      },
      assets: [],
    },
  ],
  currentEntities: [],
  entity: null,
  currentAsset: EMPTY_ASSET,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoomsByFloorId: (state, action: PayloadAction<number>) => {
      state.currentEntities = state.entities.filter(room => room.floorId === action.payload);
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      state.entities = state.entities.map(room => {
        return room.id === action.payload.id ? { ...room, ...action.payload } : room;
      });
      state.currentEntities = state.currentEntities.map(room => {
        return room.id === action.payload.id ? { ...room, ...action.payload } : room;
      });
    },
    selectAsset: (state, action: PayloadAction<Asset>) => {
      const roomFound = state.currentEntities.find(room => room.id === action.payload.roomId);
      if (roomFound) {
        state.currentAsset =
          roomFound.assets.find(asset => asset.id === action.payload.id) || EMPTY_ASSET;
      }
    },
  },
});

export const { getRoomsByFloorId, updateRoom, selectAsset } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
