module.exports = [
  {
    id: 1,
    floorId: 1,
    name: "Manufacturing Room 1",
    roomNodeData: {
      id: 1,
      roomId: 1,
      type: "room",
      position: {
        x: 0,
        y: 0,
      },
    },
    assets: [
      {
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
        roomId: 1,
        type: "machine",
        name: "machine_4",
        position: {
          x: 315,
          y: 85,
        },
        connections: [],
        data: {
          status: "stopped",
          state: "error",
          temperature: 50,
        },
      },
      {
        id: 6,
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
    id: 2,
    floorId: 2,
    name: "Office",
    roomNodeData: {
      id: 1,
      roomId: 3,
      type: "room",
      position: {
        x: 0,
        y: 0,
      },
    },
    assets: [],
  },
];
