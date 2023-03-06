import { memo, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  getFloorsByBuildingId,
  selectBuilding,
  selectCurrentBuildingsData,
} from "@/redux/features";

import { ResizeMap, ChangeCenter } from "../common";
import { BuildingPolygon } from "./BuildingPolygon";
import { BuildingLegend } from "./BuildingMapLegend";
import { FLOORS_MAIN, WORLD_MAIN } from "../location.routes.const";

import "@/style.css";

interface BuildingsProps {
  center: LatLngExpression;
  navigateToPanel: (arg1: string) => void;
}

const BuildingsMainPanel = ({ center, navigateToPanel }: BuildingsProps) => {
  const [mapId] = useState<string>("buildings-map");

  const buildings = useAppSelector(selectCurrentBuildingsData);
  const dispatch = useAppDispatch();

  const onBuildingClick = (id: number) => {
    dispatch(getFloorsByBuildingId(id));
    dispatch(selectBuilding(id));
    navigateToPanel(FLOORS_MAIN);
  };

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Buildings</h3>
          <Button color="primary" onClick={() => navigateToPanel(WORLD_MAIN)}>
            Back
          </Button>
        </CardHeader>
        <CardBody>
          <MapContainer id={mapId} center={center} minZoom={17} zoom={18} inertia>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buildings.map(building => (
              <BuildingPolygon
                key={building.id}
                building={building}
                onBuildingClick={onBuildingClick}
              />
            ))}
            <ResizeMap mapId={mapId} />
            <ChangeCenter center={center} zoom={18} />
            <BuildingLegend />
          </MapContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default memo(BuildingsMainPanel);
