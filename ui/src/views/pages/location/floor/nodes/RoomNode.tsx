import { memo } from "react";
import { NodeProps } from "reactflow";
import { Container } from "reactstrap";

import { Room } from "@/types/domain";

import bg1 from "@/assets/img/rooms/room_1.png";
import bg2 from "@/assets/img/rooms/room_2.png";

import "@reactflow/node-resizer/dist/style.css";

export type MyNodeProps = NodeProps<Room>;

const images: { [key: number]: string } = { 1: bg1, 2: bg2 };

const RoomNode: React.FC<MyNodeProps> = ({ id, data }) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Container className="d-flex justify-content-center">
          <h1>{data.name}</h1>
        </Container>
        <img
          id={data.roomNodeData.id.toString()}
          className="react-flow__room"
          src={images[parseInt(id)]}
          alt="Room"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
    </>
  );
};

export default memo(RoomNode);
