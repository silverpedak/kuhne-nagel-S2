import { memo, useState } from "react";
import { Card, CardHeader, CardBody, Button, Row, Col, CardTitle } from "reactstrap";

import { alerts } from "@/views/components/feedback";
import { EMPTY_FLOOR, Floor } from "@/types/domain";

import { CreateFloorPanel } from "./create/CreateFloor.panel";
import { DetailsFloorPanel } from "./details/DetailsFloor.panel";

import { BUILDINGS_MAIN, FLOOR_MAIN } from "../location.routes.const";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  createFloor,
  deleteFloor,
  getRoomsByFloorId,
  selectAllFloorsData,
  selectCurrentBuilding,
  selectCurrentFloor,
  selectFloor,
  updateFloor,
} from "@/redux/features";

interface FloorsMainProps {
  navigateToPanel: (arg1: string) => void;
}

const FloorsMainPanel = ({ navigateToPanel }: FloorsMainProps): JSX.Element => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const floors = useAppSelector(selectAllFloorsData);
  const building = useAppSelector(selectCurrentBuilding);
  const currentFloor = useAppSelector(selectCurrentFloor);

  const dispatch = useAppDispatch();

  const toggleIsEditModalOpen = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleIsCreateModalOpen = () => setIsCreateModalOpen(!isCreateModalOpen);

  const onViewDetails = (floor: Floor) => {
    dispatch(selectFloor(floor));
    setIsEditModalOpen(true);
  };

  const onOpenCreate = () => {
    dispatch(selectFloor(EMPTY_FLOOR));
    setIsCreateModalOpen(true);
  };

  const onCreateFloor = async (newFloor: Floor) => {
    const { isConfirmed } = await alerts.confirmActionSuccess(
      "you want to create floor?",
      "Are you sure"
    );
    if (isConfirmed) {
      await dispatch(createFloor(newFloor));
      setIsCreateModalOpen(false);
    }
  };

  const onEditFloor = async (updatedFloor: Floor) => {
    const { isConfirmed } = await alerts.confirmActionSuccess(
      "you want to save changes?",
      "Are you sure"
    );
    if (isConfirmed) {
      dispatch(updateFloor(updatedFloor));
      setIsEditModalOpen(false);
    }
  };

  const onDeleteFloor = async (id: number) => {
    const { isConfirmed } = await alerts.confirmActionDanger(
      "you want to delete floor?",
      "Are you sure"
    );
    if (isConfirmed) {
      await dispatch(deleteFloor(id));
      setIsEditModalOpen(false);
    }
  };

  const onViewFloorPlan = (floor: Floor) => {
    dispatch(getRoomsByFloorId(floor.id));
    dispatch(selectFloor(floor));
    navigateToPanel(FLOOR_MAIN);
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
              {floors.map((floor: Floor) => (
                <Card key={floor.id}>
                  <CardHeader>
                    <Row className="d-flex align-items-center justify-content-between">
                      <Col sm="10">
                        <h4 className="text-uppercase mb-0">{`${floor.floorNr} ${floor.name}`}</h4>
                      </Col>
                      <Col sm="2" className="d-flex justify-content-end">
                        <Button size="sm" onClick={() => onViewDetails(floor)}>
                          <i className="fa fa-pen-to-square" />
                        </Button>
                        <Button size="sm" onClick={() => onViewFloorPlan(floor)}>
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
