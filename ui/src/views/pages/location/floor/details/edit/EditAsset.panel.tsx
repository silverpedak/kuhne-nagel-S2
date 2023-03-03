import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";

import { InputField } from "@/views/components/widgets";
import { Asset } from "@/types/domain";

interface EditAssetProps {
  asset: Asset;
  onSaveClick: (name: string) => Promise<void>;
}

export const EditAssetPanel = ({ asset, onSaveClick }: EditAssetProps): JSX.Element => {
  const [nameUi, setNameUi] = useState<string>("");
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);

  useEffect(() => {
    setNameUi(asset.name);
  }, [asset]);

  useEffect(() => {
    setIsSaveDisabled(nameUi === "" ? true : asset.name === nameUi ? true : false);
  }, [nameUi]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveClick(nameUi);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <InputField
              name="name"
              id="name"
              label="Name*"
              type="text"
              value={nameUi}
              invalid={nameUi === ""}
              onChange={e => setNameUi(e.target.value)}
            />
            <Col className="d-flex justify-content-end p-0">
              <Button size="sm" disabled={isSaveDisabled} color="primary">
                Save
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
    </>
  );
};
