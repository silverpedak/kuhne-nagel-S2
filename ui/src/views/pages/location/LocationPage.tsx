import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Container, Row, TabContent, TabPane } from "reactstrap";
import { LatLngExpression } from "leaflet";

import { floorsService, buildingService, locationService, roomService } from "@/api";
import { BoxHeader } from "@/views/layout/headers";
import { Location, Building, Floor, EMPTY_FLOOR, Room, EMPTY_BUILIDNG } from "@/types/domain";
import { handleError } from "@/common/api-error-handler";

import BuildingsMainPanel from "./building/BuildingsMain.panel";
import FloorMainPanel from "./floor/FloorMain.panel";
import FloorsMainPanel from "./floors/FloorsMain.panel";
import WorldMapLeafletPanel from "./world/WorldMapLeaflet.panel";

import { WORLD_MAIN, BUILDINGS_MAIN, FLOOR_MAIN, FLOORS_MAIN } from "./location.routes.const";

export const LocationPage = () => {
  const [activeTab, setActiveTab] = useState<string>(WORLD_MAIN);
  const [center, setCenter] = useState<LatLngExpression>([0, 0]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [currentBuilding, setCurrentBuilding] = useState<Building>(EMPTY_BUILIDNG);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [floor, setFloor] = useState<Floor>(EMPTY_FLOOR);
  const [rooms, setRooms] = useState<Room[]>([]);

  const getLocations = async () => {
    try {
      const { data } = await locationService.findAllLocations();
      setLocations(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const onViewBuildings = async (id: number) => {
    try {
      const { data } = await buildingService.getBuildingsByLocationId(id);
      setBuildings(data);
      setActiveTab(BUILDINGS_MAIN);
    } catch (err) {
      handleError(err);
    }
  };

  const onViewFloors = async (buildingId: number) => {
    try {
      const { data } = await floorsService.getFloorsByBuildingId(buildingId);
      const sortedFloors = data.sort((a, b) => b.floorNr - a.floorNr);
      setFloors(sortedFloors);
      const buildingFound = buildings.find(building => building.id === buildingId);
      if (buildingFound) setCurrentBuilding(buildingFound);
      setActiveTab(FLOORS_MAIN);
    } catch (err) {
      handleError(err);
    }
  };

  const onViewFloorPlan = async (floorId: number) => {
    try {
      const { data } = await roomService.getRoomsByFloorId(floorId);
      setRooms(data);
      setActiveTab(FLOOR_MAIN);
    } catch (err) {
      handleError(err);
    }
    const floorFound = floors.find(floor => floor.id === floorId);
    if (floorFound) setFloor(floorFound);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="d-flex align-items-center justify-content-between">
                <h3 className="mb-0">Location</h3>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={WORLD_MAIN}>
                    <WorldMapLeafletPanel
                      setCenter={setCenter}
                      locations={locations}
                      onViewBuildings={onViewBuildings}
                    />
                  </TabPane>
                  <TabPane tabId={BUILDINGS_MAIN}>
                    <BuildingsMainPanel
                      center={center}
                      buildings={buildings}
                      navigateToPanel={setActiveTab}
                      onViewFloors={onViewFloors}
                    />
                  </TabPane>
                  <TabPane tabId={FLOORS_MAIN}>
                    <FloorsMainPanel
                      navigateToPanel={setActiveTab}
                      floors={floors}
                      onViewFloorPlan={onViewFloorPlan}
                      building={currentBuilding}
                    />
                  </TabPane>
                  <TabPane tabId={FLOOR_MAIN}>
                    <FloorMainPanel navigateToPanel={setActiveTab} rooms={rooms} floor={floor} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
