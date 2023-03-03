import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import {
  defaultPosition,
  officePositions,
  manufacturingPositions,
  warehousePositions,
} from "@/__mocks/data/positions";
import {
  officeMarkerIcon,
  manufacturingMarkerIcon,
  warehouseMarkerIcon,
} from "@/assets/icons/markers-icons";

import "leaflet/dist/leaflet.css";
import "@/style.css";

const ResizeMap = () => {
  const map = useMap();
  // @ts-ignore
  map._onResize();
  return null;
};
type Props = {
  selectedCategory: number;
};

export const MapPanel = ({ selectedCategory }: Props): JSX.Element => {
  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={false}>
      <ResizeMap />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedCategory === 1 ? (
        officePositions.map(officePosition => (
          <Marker key={Math.random()} position={officePosition} icon={officeMarkerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))
      ) : selectedCategory === 2 ? (
        manufacturingPositions.map(manufacturingPosition => (
          <Marker
            key={Math.random()}
            position={manufacturingPosition}
            icon={manufacturingMarkerIcon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))
      ) : selectedCategory === 3 ? (
        warehousePositions.map(warehousePosition => (
          <Marker key={Math.random()} position={warehousePosition} icon={warehouseMarkerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={defaultPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
