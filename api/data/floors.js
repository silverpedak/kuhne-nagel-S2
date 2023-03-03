module.exports = [
  {
    id: 1,
    buildingId: 1,
    floorNr: 1,
    name: "Manufacturing",
    data: {
      performance: "57%",
      occupancy: 25,
      machines: {
        total: 30,
        running: 25,
      },
      alerts: [
        {
          id: 1,
          type: "error",
          text: "Saw_machine_2 error",
        },
        {
          id: 2,
          type: "warning",
          text: "Welding_robot_1 low gas",
        },
        {
          id: 3,
          type: "warning",
          text: "Robot_2 temperature warning",
        },
      ],
    },
  },
  {
    id: 2,
    buildingId: 1,
    floorNr: 2,
    name: "Office",
    data: {
      occupancy: 10,
      performance: "80%",
      alerts: [],
    },
  },
];
