import { useDraggable } from "@dnd-kit/core";
import React, { FunctionComponent } from "react";
import Bishop from "./pieces/Bishop";

interface Props {
  id: number;
  index: number;
}

const Piece: FunctionComponent<Props> = ({ id, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: index.toString(),
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className=""
    >
      <Bishop />
    </div>
  );
};

export default Piece;
