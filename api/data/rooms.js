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
        id: 3,
        roomId: 1,
        type: "machine",
        name: "machine_1",
        alerts: [],
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
        alerts: [],
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
        alerts: [
          {
            id: 1,
            name: "Main belt sensor warning",
            code: "MBW-92035235",
          },
        ],
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

        alerts: [
          {
            id: 1,
            name: "Cooling head failiure",
            code: "CHF-289237982",
          },
        ],
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
        alerts: [],
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
    floorId: 1,
    name: "Manufacturing Room 2",
    roomNodeData: {
      id: 2,
      roomId: 2,
      type: "room",
      position: {
        x: 704,
        y: 426,
      },
    },
    assets: [],
  },
  {
    id: 3,
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
  {
    id: 4,
    floorId: 2,
    name: "Rest area",
    roomNodeData: {
      id: 2,
      roomId: 4,
      type: "room",
      position: {
        x: 704,
        y: 426,
      },
    },
    assets: [],
  },
];
