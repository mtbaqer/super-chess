import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import React, { FunctionComponent, useState } from "react";
import useDragAndDropActions from "../../hooks/useDragAndDropActions";
import { getLegalMoves } from "../../logic/chessRules";
import { toKey } from "../../logic/utils";
import { cellsAtom } from "../../state/cells";
import { gameObjectsAtom } from "../../state/gameObjects";
import { roomAtom } from "../../state/room";
import { Piece, Position } from "../../types/types";
import Cell from "./Cell";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const cells = useAtomValue(cellsAtom);

  const { onDragStart, onDragEnd, isLegalMove } = useDragAndDropActions();

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex">
        <div
          //TODO: Change grid-row & grid-cols to use dynamic.
          className={`bg-red-500 grid grid-cols-10`}
        >
          {cells.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <Cell key={toKey(rowIndex, columnIndex)} cell={cell} highlight={isLegalMove(rowIndex, columnIndex)} />
            ))
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
