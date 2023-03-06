import { memo } from "react";
import { ReactFlowProvider } from "reactflow";
import { Card, CardHeader, CardBody, Row, Button } from "reactstrap";

import { FLOORS_MAIN } from "../location.routes.const";

import FloorFlowPanel from "./FloorFlow.panel";

import { useAppSelector } from "@/redux/app";
import { selectCurrentFloor, selectCurrentRoomsData } from "@/redux/features";

interface FloorMainProps {
  navigateToPanel: (arg1: string) => void;
}

const FloorMainPanel: React.FC<FloorMainProps> = ({ navigateToPanel }) => {
  const rooms = useAppSelector(selectCurrentRoomsData);
  const floor = useAppSelector(selectCurrentFloor);

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
