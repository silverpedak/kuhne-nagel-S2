import { memo, useState } from "react";
import { Card, CardHeader, CardBody, ButtonGroup, Button } from "reactstrap";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { getBuildingsByLocationId, selectAllLocationData } from "@/redux/features";

import { ResizeMap } from "../common/ResizeMap";
import { LocationMarkers } from "./LocationMarkers";
import { BUILDINGS_MAIN } from "../location.routes.const";

import "@/style.css";

interface WorldMapProps {
  setActiveTab: (arg1: string) => void;
  setCenter: (arg1: LatLngExpression) => void;
}

const WorldMapLeafletPanel = ({ setActiveTab, setCenter }: WorldMapProps): JSX.Element => {
  const [category, setCategory] = useState<number>(0);
  const [mapId] = useState<string>("world-map");
  const locations = useAppSelector(selectAllLocationData);

  const dispatch = useAppDispatch();

  const showOfficeMarker = () => {
    category !== 1 ? setCategory(1) : setCategory(0);
  };
  const showManufacturingMarker = () => {
    category !== 2 ? setCategory(2) : setCategory(0);
  };
  const showWarehouseMarker = () => {
    category !== 3 ? setCategory(3) : setCategory(0);
  };
  const showSalesMarker = () => {
    category !== 4 ? setCategory(4) : setCategory(0);
  };

  const onPopupClick = async (id: number, lat: number, lng: number) => {
    setCenter([lat, lng]);
    dispatch(getBuildingsByLocationId(id));
    setActiveTab(BUILDINGS_MAIN);
  };

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Map</h3>
          <ButtonGroup>
            <Button color={category === 1 ? "secondary" : "primary"} onClick={showOfficeMarker}>
              Office
            </Button>
            <Button
              color={category === 2 ? "secondary" : "primary"}
              onClick={showManufacturingMarker}
            >
              Manufacturing
            </Button>
            <Button color={category === 3 ? "secondary" : "primary"} onClick={showWarehouseMarker}>
              Warehouse
            </Button>
            <Button color={category === 4 ? "secondary" : "primary"} onClick={showSalesMarker}>
              Sales
            </Button>
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <MapContainer id={mapId} center={[40, 20]} minZoom={2} zoom={2} inertia>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarkers
              locations={locations}
              onPopupClick={onPopupClick}
              category={category}
            />
            <ResizeMap mapId={mapId} />
          </MapContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default memo(WorldMapLeafletPanel);
