import { useState } from "react";
import { Card, CardBody, CardHeader, Container, Row, TabContent, TabPane } from "reactstrap";
import { LatLngExpression } from "leaflet";

import { BoxHeader } from "@/views/layout/headers";

import BuildingsMainPanel from "./building/BuildingsMain.panel";
import FloorMainPanel from "./floor/FloorMain.panel";
import FloorsMainPanel from "./floors/FloorsMain.panel";
import WorldMapLeafletPanel from "./world/WorldMapLeaflet.panel";
import { WORLD_MAIN, BUILDINGS_MAIN, FLOOR_MAIN, FLOORS_MAIN } from "./location.routes.const";

export const LocationPage = () => {
  const [activeTab, setActiveTab] = useState<string>(WORLD_MAIN);
  const [center, setCenter] = useState<LatLngExpression>([0, 0]);

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
                    <WorldMapLeafletPanel setCenter={setCenter} setActiveTab={setActiveTab} />
                  </TabPane>
                  <TabPane tabId={BUILDINGS_MAIN}>
                    <BuildingsMainPanel center={center} navigateToPanel={setActiveTab} />
                  </TabPane>
                  <TabPane tabId={FLOORS_MAIN}>
                    <FloorsMainPanel navigateToPanel={setActiveTab} />
                  </TabPane>
                  <TabPane tabId={FLOOR_MAIN}>
                    <FloorMainPanel navigateToPanel={setActiveTab} />
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
