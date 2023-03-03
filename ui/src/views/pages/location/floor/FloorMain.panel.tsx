import { memo } from "react";
import { ReactFlowProvider } from "reactflow";
import { Card, CardHeader, CardBody, Row, Button } from "reactstrap";

import { FLOORS_MAIN } from "../location.routes.const";

import FloorFlowPanel from "./FloorFlow.panel";
import { Floor, Room } from "@/types/domain";

interface FloorMainProps {
  floor: Floor;
  rooms: Room[];
  navigateToPanel: (arg1: string) => void;
}

const FloorMainPanel: React.FC<FloorMainProps> = ({ floor, rooms, navigateToPanel }) => {
  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <CardHeader className="d-flex align-items-center justify-content-between">
              <h3 className="mb-0">{`${floor.floorNr} ${floor.name}`}</h3>
              <Button color="primary" onClick={() => navigateToPanel(FLOORS_MAIN)}>
                Back
              </Button>
            </CardHeader>
            <CardBody className="mb-4">
              <ReactFlowProvider>
                <FloorFlowPanel rooms={rooms} />
              </ReactFlowProvider>
            </CardBody>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default memo(FloorMainPanel);
