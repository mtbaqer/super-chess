import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import React, { FunctionComponent, useState } from "react";
import { getLegalMoves } from "../../logic/chessRules";
import { toKey } from "../../logic/utils";
import { cellsAtom } from "../../state/cells";
import { gameObjectsAtom } from "../../state/gameObjects";
import { roomAtom } from "../../state/room";
import { Piece, Position } from "../../types/types";
import Cell from "./Cell";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom)!;
  const cells = useAtomValue(cellsAtom);
  const objects = useAtomValue(gameObjectsAtom);

  const [legalMoves, setLegalMoves] = useState<Set<string>>(new Set());

  function onDragStart(event: DragStartEvent) {
    const piece = event.active.data.current as any as Piece;
    const moves = getLegalMoves(piece.type, piece, objects, room.columns, room.rows);
    const set = new Set<string>();
    for (const move of moves) {
      set.add(toKey(move.row, move.column));
    }
    setLegalMoves(set);
  }
  function onDragEnd(event: DragEndEvent) {
    setLegalMoves(new Set());
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex">
        <div
          //TODO: Change grid-row & grid-cols to use dynamic.
          className={`bg-red-500 grid grid-cols-10`}
        >
          {cells.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <Cell
                key={toKey(rowIndex, columnIndex)}
                cell={cell}
                highlight={legalMoves.has(toKey(rowIndex, columnIndex))}
              />
            ))
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
