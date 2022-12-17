import React, { FunctionComponent } from "react";
import Image from "next/image";
import Bishop from "./pieces/Bishop";
import Piece from "./Piece";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  value: number;
  index: number;
  row: number;
  col: number;
}

const Cell: FunctionComponent<Props> = ({ index, row, col, value }) => {
  const id = `${row}-${col}`;
  const { isOver, setNodeRef } = useDroppable({ id: index });
  const color = (row + col) % 2 === 0 ? "bg-board-black" : "bg-board-white";
  return (
    <div
      ref={setNodeRef}
      className={`${color} grid place-content-center p-2 w-24 h-24 max-w-xs max-h-xs`}
    >
      {value == 1 && <Piece id={index} index={index} />}
    </div>
  );
};

export default Cell;
