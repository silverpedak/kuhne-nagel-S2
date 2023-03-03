import { ControlButton, Controls } from "reactflow";

interface CustomControlProps {
  toggle: () => void;
}

export const CustomControls = ({ toggle }: CustomControlProps) => {
  return (
    <Controls showInteractive={false}>
      <ControlButton onClick={() => toggle()}>
        <i className="fa fa-pen-to-square" />
      </ControlButton>
    </Controls>
  );
};
