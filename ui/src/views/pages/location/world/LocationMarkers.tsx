import { Row } from "reactstrap";
import { Marker, Popup } from "react-leaflet";

import {
  officeMarkerIcon,
  manufacturingMarkerIcon,
  warehouseMarkerIcon,
  salesMarkerIcon,
} from "@/assets/icons/markers-icons";
import { Location } from "@/types/domain/location-model.type";

interface MarkersProps {
  isOpen: boolean;
  toggle: () => void;
  locations: Location[];
  category: number;
  onPopupClick: (locationId: number, lat: number, lng: number) => void;
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
              <Row className="align-items-center">
                <div className="col ">
                  <h4 className="mb-0">
                    <span className="text-success mr-1">●</span>
                    <a
                      href="#pablo"
                      onClick={() =>
                        onPopupClick(location.id, location.latitude, location.longitude)
                      }
                    >
                      {location.title}
                    </a>
                  </h4>
                  <p className="text-sm text-muted m-0 mt-2">{location.address}</p>
                  <p className="text-sm text-muted m-0">{location.country}</p>
                  <p className="text-sm text-muted m-0">{location.owner.name}</p>
                </div>
              </Row>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
