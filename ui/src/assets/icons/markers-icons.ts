import * as L from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";

export const officeMarkerIcon = L.AwesomeMarkers.icon({
  icon: "building",
  prefix: "fa",
  markerColor: "darkred",
  iconColor: "#fff",
});
export const manufacturingMarkerIcon = L.AwesomeMarkers.icon({
  icon: "industry",
  prefix: "fa",
  markerColor: "cadetblue",
  iconColor: "#fff",
});
export const warehouseMarkerIcon = L.AwesomeMarkers.icon({
  icon: "warehouse",
  prefix: "fa",
  markerColor: "orange",
  iconColor: "#fff",
});

export const salesMarkerIcon = L.AwesomeMarkers.icon({
  icon: "dollar",
  prefix: "fa",
  markerColor: "green",
  iconColor: "#fff",
});
