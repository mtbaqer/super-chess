import { useDraggable } from "@dnd-kit/core";
import React, { FunctionComponent } from "react";
import type { Piece } from "../../types/types";
import King from "./pieces/King";

interface Props {
  piece: Piece;
}

const Piece: FunctionComponent<Props> = ({ piece }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: piece.id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="">
      <King />
    </div>
  );
};

export default Piece;
