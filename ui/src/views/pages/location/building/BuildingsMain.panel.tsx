import { memo, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { Building } from "@/types/domain/building-model.type";
import { WORLD_MAIN } from "../location.routes.const";

import { ResizeMap, ChangeCenter } from "../common";
import { BuildingPolygon } from "./BuildingPolygon";
import { BuildingLegend } from "./BuildingMapLegend";

import "@/style.css";

interface BuildingsProps {
  center: LatLngExpression;
  buildings: Building[];
  navigateToPanel: (arg1: string) => void;
  onViewFloors: (id: number) => void;
}

const BuildingsMainPanel = ({
  center,
  buildings,
  navigateToPanel,
  onViewFloors,
}: BuildingsProps) => {
  const [mapId] = useState<string>("buildings-map");

  const onBuildingClick = (id: number) => {
    onViewFloors(id);
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
