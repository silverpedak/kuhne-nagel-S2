import { ReactNode, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

import { InputField } from "@/views/components/widgets";
import { Floor } from "@/types/domain";

interface EditFloorPanelProps {
  children?: ReactNode;
  floor: Floor;
  isOpen: boolean;
  label: string;
  onSave: (floor: Floor) => void;
  toggle: () => void;
}

export const EditFloorPanel = ({
  children,
  floor,
  isOpen,
  label,
  onSave,
  toggle,
}: EditFloorPanelProps): JSX.Element => {
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);
  const [floorUi, setFloorUi] = useState<Floor>(floor);

  useEffect(() => {
    floorUi.floorNr === 0
      ? setIsSaveDisabled(true)
      : floorUi === floor
      ? setIsSaveDisabled(true)
      : setIsSaveDisabled(false);
  }, [floor, floorUi]);

  useEffect(() => {
    setFloorUi(floor);
  }, [floor]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(floorUi);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          close={
            <button onClick={toggle} className="custom-close-button">
              &times;
            </button>
          }
        >
          {label}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onFormSubmit}>
            <Row>
              <Col>
                <InputField
                  name="floorNr"
                  id="floor-number"
                  label="Floor Number*"
                  type="number"
                  autoComplete="off"
                  value={floorUi.floorNr}
                  invalid={floorUi.floorNr === 0}
                  onChange={e => {
                    const value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
                    setFloorUi({ ...floorUi, floorNr: value });
                  }}
                />
                <InputField
                  name="floorName"
                  id="floor-name"
                  label="Floor Name"
                  type="text"
                  autoComplete="off"
                  value={floorUi.name || ""}
                  onChange={e => setFloorUi({ ...floorUi, name: e.target.value })}
                />
                <Col className="d-flex justify-content-between p-0">
                  <Container className="p-0">{children}</Container>

                  <Button disabled={isSaveDisabled} color="success" className="">
                    Save
                  </Button>
                </Col>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
