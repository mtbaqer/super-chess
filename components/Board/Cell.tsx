import React, { FunctionComponent } from "react";
import Piece from "./Piece";
import { useDroppable } from "@dnd-kit/core";
import { Cell } from "../../types/types";
import { isPiece } from "../../utils";
import { selectAtom, useAtomValue } from "jotai/utils";
import { gameObjectsAtom } from "../../state/gameObjects";
import GameObject from "./GameObject";

interface Props {
  cell: Cell;
  index: number;
}

const Cell: FunctionComponent<Props> = ({ cell, index }) => {
  const { row, column } = cell;
  const color = (row + column) % 2 === 0 ? "bg-board-black" : "bg-board-white";

  // const currentObjectAtom = selectAtom(gameObjectsAtom, (objects) => objects[row][column]);
  // const currentObject = useAtomValue(currentObjectAtom);
  const objects = useAtomValue(gameObjectsAtom);
  const currentObject = objects[cell.row][cell.column];

  const { setNodeRef } = useDroppable({ id: index });

  return (
    <div ref={setNodeRef} className={`${color} grid place-content-center p-2 w-24 h-24 max-w-xs max-h-xs`}>
      {currentObject &&
        (isPiece(currentObject) ? <Piece piece={currentObject} /> : <GameObject gameObject={currentObject} />)}
    </div>
  );
};

export default Cell;
