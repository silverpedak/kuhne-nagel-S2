import { memo, useState } from "react";
import { Card, CardHeader, CardBody, Button, Row, Col, CardTitle } from "reactstrap";

import { floorsService } from "@/api";
import { alerts } from "@/views/components/feedback";
import { handleError } from "@/common/api-error-handler";
import { Building, EMPTY_FLOOR, Floor } from "@/types/domain";

import { CreateFloorPanel } from "./create/CreateFloor.panel";
import { DetailsFloorPanel } from "./details/DetailsFloor.panel";

import { BUILDINGS_MAIN } from "../location.routes.const";

interface FloorsMainProps {
  floors: Floor[];
  building: Building;
  navigateToPanel: (arg1: string) => void;
  onViewFloorPlan: (floorId: number) => void;
}

const FloorsMainPanel = ({
  floors,
  building,
  navigateToPanel,
  onViewFloorPlan,
}: FloorsMainProps): JSX.Element => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentFloor, setCurrentFloor] = useState<Floor>(EMPTY_FLOOR);

  const toggleIsEditModalOpen = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleIsCreateModalOpen = () => setIsCreateModalOpen(!isCreateModalOpen);

  const onViewDetails = (id: number) => {
    const floorFound = floors.find(floor => floor.id === id);
    if (floorFound) {
      setCurrentFloor(floorFound);
      toggleIsEditModalOpen();
    }
  };

  const onOpenCreate = () => {
    setCurrentFloor(EMPTY_FLOOR);
    toggleIsCreateModalOpen();
  };

  const onCreateFloor = async (newFloor: Floor) => {
    const { isConfirmed } = await alerts.confirmActionSuccess(
      "you want to create floor?",
      "Are you sure"
    );
    if (isConfirmed) {
      try {
        await floorsService.createFloor(newFloor);
        alerts.successAlert("", "New floor created!");
        toggleIsCreateModalOpen();
      } catch (err) {
        handleError(err);
      }
    }
  };

  const onEditFloor = async (editedFloor: Floor) => {
    const { isConfirmed } = await alerts.confirmActionSuccess(
      "you want to save changes?",
      "Are you sure"
    );
    if (isConfirmed) {
      try {
        await floorsService.updateFloor(editedFloor);
        alerts.successAlert("", "Changes saved!");
        toggleIsEditModalOpen();
      } catch (err) {
        handleError(err);
      }
    }
  };

  const onDeleteFloor = async (floorId: number) => {
    const { isConfirmed } = await alerts.confirmActionDanger(
      "you want to delete floor?",
      "Are you sure"
    );
    if (isConfirmed) {
      try {
        await floorsService.deleteFloor(floorId);
        alerts.successAlert("Deleted!");
        toggleIsEditModalOpen();
      } catch (err) {
        handleError(err);
      }
    }
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <CardHeader className="d-flex align-items-center justify-content-between">
              <h3 className="mb-0">{`${building.address}`}</h3>
              <Button color="primary" onClick={() => navigateToPanel(BUILDINGS_MAIN)}>
                Back
              </Button>
            </CardHeader>
            <CardBody>
              {floors.map(floor => (
                <Card key={floor.id}>
                  <CardHeader>
                    <Row className="d-flex align-items-center justify-content-between">
                      <Col sm="10">
                        <h4 className="text-uppercase mb-0">{`${floor.floorNr} ${floor.name}`}</h4>
                      </Col>
                      <Col sm="2" className="d-flex justify-content-end">
                        <Button size="sm" onClick={() => onViewDetails(floor.id)}>
                          <i className="fa fa-pen-to-square" />
                        </Button>
                        <Button size="sm" onClick={() => onViewFloorPlan(floor.id)}>
                          <i className="fa fa-arrow-right" />
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <Row>
                      <Col md="6" lg="3">
                        <Card>
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                  people
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {floor.data?.occupancy || 0}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                  <i className="fa fa-people-group" />
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-sm">
                              <span className="text-success mr-2">
                                <i className="fa fa-arrow-up" /> 3.48%
                              </span>{" "}
                              <span className="text-nowrap">Since last month</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="6" lg="3">
                        <Card>
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                  alerts
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {floor.data?.alerts.length || 0}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                  <i className="fa fa-triangle-exclamation" />
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-sm">
                              <span className="text-success mr-2">
                                <i className="fa fa-arrow-up" /> 3.48%
                              </span>{" "}
                              <span className="text-nowrap">Since last month</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      {floor.data?.machines ? (
                        <Col md="6" lg="3">
                          <Card>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                    machines running
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {`${floor.data.machines.running}/${floor.data.machines.total}`}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-gradient-blue text-white rounded-circle shadow">
                                    <i className="fa fa-gears" />
                                  </div>
                                </Col>
                              </Row>
                              <p className="mt-3 mb-0 text-sm">
                                <span className="text-success mr-2">
                                  <i className="fa fa-arrow-up" /> 3.48%
                                </span>{" "}
                                <span className="text-nowrap">Since last month</span>
                              </p>
                            </CardBody>
                          </Card>
                        </Col>
                      ) : null}
                      <Col md="6" lg="3">
                        <Card>
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                  performance
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {floor.data?.performance || "0%"}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-gradient-teal text-white rounded-circle shadow">
                                  <i className="ni ni-chart-bar-32" />
                                </div>
                              </Col>
                            </Row>

                            <p className="mt-3 mb-0 text-sm">
                              <span className="text-success mr-2">
                                <i className="fa fa-arrow-up" /> 3.48%
                              </span>{" "}
                              <span className="text-nowrap">Since last month</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
              <Card>
                <Button onClick={onOpenCreate} color="neutral">
                  <i className="fa fa-plus fa-2x" />
                </Button>
              </Card>
            </CardBody>
          </Card>
        </div>
      </Row>
      <CreateFloorPanel
        onSave={onCreateFloor}
        isOpen={isCreateModalOpen}
        toggle={toggleIsCreateModalOpen}
        building={building}
      />
      <DetailsFloorPanel
        floor={currentFloor}
        isOpen={isEditModalOpen}
        onSave={onEditFloor}
        onDelete={onDeleteFloor}
        toggle={toggleIsEditModalOpen}
      />
    </>
  );
};

export default memo(FloorsMainPanel);
