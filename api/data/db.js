const locationsData = require("./locations");
const buildingsData = require("./buildings");
const floorsData = require("./floors");
const roomsData = require("./rooms");

module.exports = () => ({
  location: locationsData,
  building: buildingsData,
  floor: floorsData,
  room: roomsData,
});
