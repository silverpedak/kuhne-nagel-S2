import { useEffect, useState } from "react";
import { Button } from "reactstrap";

import { Floor } from "@/types/domain";

import { EditFloorPanel } from "../common";

interface CreateFloorPanelProps {
  floor: Floor;
  isOpen: boolean;
  toggle: () => void;
  onDelete: (id: number) => void;
  onSave: (floor: Floor) => void;
}

export const DetailsFloorPanel = ({
  floor,
  isOpen,
  toggle,
  onDelete,
  onSave,
}: CreateFloorPanelProps): JSX.Element => {
  const [floorUi, setFloorUi] = useState<Floor>(floor);

  useEffect(() => {
    setFloorUi(floor);
  }, [floor]);

  return (
    <>
      <EditFloorPanel
        onSave={onSave}
        floor={floorUi}
        isOpen={isOpen}
        toggle={toggle}
        label="Edit Floor"
      >
        <Button color="danger" onClick={() => onDelete(floor.id)}>
          <i className="fa fa-trash" />
        </Button>
      </EditFloorPanel>
    </>
  );
};
