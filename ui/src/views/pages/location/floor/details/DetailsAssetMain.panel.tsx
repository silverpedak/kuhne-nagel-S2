import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import machineImg from "@/assets/img/machine.png";
import { alerts } from "@/views/components/feedback";
import { Asset } from "@/types/domain";
import { BoxHeader } from "@/views/layout/headers";

import { EditAssetPanel } from "./edit/EditAsset.panel";
import { DetailsAssetPanel } from "./table/DetailsAsset.panel";
import { ASSET_DETAILS, ASSET_EDIT } from "./asset.routes.const";

interface AssetDetailsProps {
  asset: Asset;
  isOpen: boolean;
  toggle: () => void;
  onSave: (assetId: number, name: string) => Promise<void>;
  onDelete: (assetId: number) => Promise<void>;
}

export const DetailsAssetMain = ({
  asset,
  isOpen,
  toggle,
  onSave,
  onDelete,
}: AssetDetailsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(ASSET_DETAILS);

  const onDeleteClick = async () => {
    const { isConfirmed } = await alerts.confirmActionDanger(
      "you want to delete?",
      "Are you sure?"
    );
    if (isConfirmed) {
      await onDelete(asset.id);
      toggle();
    }
  };

  const onSaveClick = async (name: string) => {
    const { isConfirmed } = await alerts.confirmActionSuccess("you want to save?", "Are you sure");
    if (isConfirmed) {
      await onSave(asset.id, name);
      toggle();
    }
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
        ></ModalHeader>
        <BoxHeader />
        <ModalBody className="mt--5">
          <Card className="card-profile">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  {asset.data?.image ? (
                    <img alt="image" className="rounded-circle" src={machineImg} />
                  ) : (
                    <img alt="image" className="rounded-circle" src={machineImg} />
                  )}
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                {activeTab === ASSET_DETAILS ? (
                  <Button className="mr-4" onClick={() => setActiveTab(ASSET_EDIT)} size="sm">
                    <i className="fa fa-pen-to-square" />
                  </Button>
                ) : (
                  <>
                    <Button className="mr-4" onClick={() => setActiveTab(ASSET_DETAILS)} size="sm">
                      <i className="fa fa-arrow-left" />
                    </Button>
                    <Button className="float-right" onClick={onDeleteClick} size="sm">
                      <i className="fa fa-trash" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="text-center">
                <h5 className="h3">{asset.name}</h5>
              </div>
              <TabContent activeTab={activeTab} className="mt-4">
                <TabPane tabId={ASSET_DETAILS}>
                  <DetailsAssetPanel asset={asset} />
                </TabPane>
                <TabPane tabId={ASSET_EDIT}>
                  <EditAssetPanel asset={asset} onSaveClick={onSaveClick} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};
