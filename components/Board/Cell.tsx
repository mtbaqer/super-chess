import React, { FunctionComponent } from "react";
import Piece from "./Piece";
import { useDroppable } from "@dnd-kit/core";
import { Cell } from "../../types/types";
import { isPiece } from "../../logic/utils";
import { selectAtom, useAtomValue } from "jotai/utils";
import { gameObjectsAtom } from "../../state/gameObjects";
import GameObject from "./GameObject";

interface Props {
  cell: Cell;
  highlight: boolean;
}

const Cell: FunctionComponent<Props> = ({ cell, highlight }) => {
  const { row, column } = cell;
  const color = highlight ? "bg-board-highlight" : (row + column) % 2 === 0 ? "bg-board-black" : "bg-board-white";

  // const currentObjectAtom = selectAtom(gameObjectsAtom, (objects) => objects[row][column]);
  // const currentObject = useAtomValue(currentObjectAtom);
  const objects = useAtomValue(gameObjectsAtom);
  const currentObject = objects[cell.row][cell.column];

  const { setNodeRef } = useDroppable({ id: `${row}-${column}`, data: cell });

  return (
    <div ref={setNodeRef} className={`${color} grid place-content-center p-2 w-24 h-24 max-w-xs max-h-xs`}>
      {currentObject &&
        (isPiece(currentObject) ? <Piece piece={currentObject} /> : <GameObject gameObject={currentObject} />)}
      {}
    </div>
  );
};

export default Cell;
