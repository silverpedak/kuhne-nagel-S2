import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, ModalBody, ModalHeader } from "reactstrap";

import { InputField, SelectField } from "@/views/components/widgets";
import { TYPE_OPTIONS } from "@/common/consts";

import { AssetUi, SelectOption } from "@/types/ui/common-ui";

import "@/style.css";

interface CreateAssetPanelProps {
  assetUi: AssetUi;
  typeSelected: SelectOption;
  setAssetUi: (assetUi: AssetUi) => void;
  setTypeSelected: (typeSelected: SelectOption) => void;
  isOpen: boolean;
  toggle: () => void;
  setAddingNodeEnabled: (arg1: boolean) => void;
}

export const CreateAssetPanel: React.FC<CreateAssetPanelProps> = ({
  assetUi,
  typeSelected,
  setAssetUi,
  setTypeSelected,
  isOpen,
  toggle,
  setAddingNodeEnabled,
}) => {
  const [isCreateDisabled, setIsCreateDisabled] = useState<boolean>(false);

  useEffect(() => {
    assetUi.name === "" ? setIsCreateDisabled(true) : setIsCreateDisabled(false);
  }, [assetUi]);

  const addAssetData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggle();
    setAddingNodeEnabled(true);
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
          Create New Asset
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={addAssetData} className="px-3">
            <InputField
              name="name"
              id="asset-name"
              label="Name*"
              type="text"
              autoComplete="off"
              value={assetUi.name}
              invalid={assetUi.name === ""}
              onChange={e => setAssetUi({ ...assetUi, name: e.target.value })}
            />
            <SelectField
              id="input-type"
              label="Type"
              disableAll={true}
              options={TYPE_OPTIONS}
              value={typeSelected}
              onChange={(newValue: unknown) => {
                if (newValue !== null && typeof newValue === "object" && "value" in newValue) {
                  setTypeSelected(newValue as SelectOption);
                  setAssetUi({ ...assetUi, type: newValue as SelectOption });
                }
              }}
            />
            <Col className="d-flex justify-content-end p-0">
              <Button disabled={isCreateDisabled} color="success">
                Create
              </Button>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
