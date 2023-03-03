import { Container } from "reactstrap";
import { Marker, Popup } from "react-leaflet";

import {
  officeMarkerIcon,
  manufacturingMarkerIcon,
  warehouseMarkerIcon,
  salesMarkerIcon,
} from "@/assets/icons/markers-icons";
import { Location } from "@/types/domain/location-model.type";

interface MarkersProps {
  locations: Location[];
  category: number;
  onPopupClick: (arg1: number, arg2: number, arg3: number) => void;
}
export const LocationMarkers = ({
  locations,
  category,
  onPopupClick,
}: MarkersProps): JSX.Element => {
  return (
    <>
      {locations
        .filter(location => (category !== 0 ? location.typeId === category : location))
        .map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={
              location.typeId === 1
                ? officeMarkerIcon
                : location.typeId === 2
                ? manufacturingMarkerIcon
                : location.typeId === 3
                ? warehouseMarkerIcon
                : location.typeId === 4
                ? salesMarkerIcon
                : undefined
            }
            title={`${location.title}\n${location.country}\n${location.address}\n${location.owner.name}`}
            riseOnHover
          >
            <Popup>
              <Container
                className=""
                onClick={() => onPopupClick(location.id, location.latitude, location.longitude)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  {location.title}
                  <br />
                  {location.address}
                  <br />
                  {location.country}
                  <br />
                  {location.owner.name}
                </p>
              </Container>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
