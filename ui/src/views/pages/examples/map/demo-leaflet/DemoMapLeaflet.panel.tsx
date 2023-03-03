import { useState } from "react";

import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Container } from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

import { MapPanel } from "./MapPanel";

export const DemoLeafletPanel = (): JSX.Element => {
  const [category, setCategory] = useState<number>(0);

  const showOfficeMarker = () => {
    setCategory(1);
  };
  const showManufacturingMarker = () => {
    setCategory(2);
  };
  const showWarehouseMarker = () => {
    setCategory(3);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader className="d-flex justify-content-between">
            <Col lg="2">
              <h3 className="mb-0">Demo Leaflet</h3>
            </Col>
            <Col lg="5">
              <ButtonGroup aria-label="Basic example" role="group">
                <Button color="primary" type="button" onClick={showOfficeMarker}>
                  Office
                </Button>
                <Button color="primary" type="button" onClick={showManufacturingMarker}>
                  Manufacturing
                </Button>
                <Button color="primary" type="button" onClick={showWarehouseMarker}>
                  Warehouse
                </Button>
              </ButtonGroup>
            </Col>
          </CardHeader>
          <CardBody className="leaflet-container">
            <MapPanel selectedCategory={category} />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
