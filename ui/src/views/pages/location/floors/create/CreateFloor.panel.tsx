import { Building, EMPTY_FLOOR, Floor } from "@/types/domain";
import { EditFloorPanel } from "../common/EditFloor.panel";

interface CreateFloorPanelProps {
  building: Building;
  isOpen: boolean;
  toggle: () => void;
  onSave: (floor: Floor) => void;
}

export const CreateFloorPanel = ({
  building,
  isOpen,
  toggle,
  onSave,
}: CreateFloorPanelProps): JSX.Element => {
  const floor = { ...EMPTY_FLOOR, buildingId: building.id };

  return (
    <>
      <EditFloorPanel
        onSave={onSave}
        floor={floor}
        isOpen={isOpen}
        toggle={toggle}
        label="Create New Floor"
      />
    </>
  );
};
