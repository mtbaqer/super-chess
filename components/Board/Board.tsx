import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import React, { FunctionComponent, useState } from "react";
import { Default_Cols_Count, Default_Rows_Count } from "../../constants";
import { roomAtom } from "../../state/room";
import Cell from "./Cell";

const Cells = Array(Default_Rows_Count * Default_Cols_Count).fill(0);

Cells[0] = 1;

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const [cells, setCells] = useState(Cells);
  function onDragStart(event: DragStartEvent) {}
  function onDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over) {
      setCells((cells) => {
        const newCells = [...cells];
        newCells[Number(active.id)] = 0;
        newCells[Number(over.id)] = 1;
        return newCells;
      });
    }
  }
  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex">
        <div
          //TODO: Change grid-row & grid-cols to use dynamic.
          className={`bg-red-500 grid grid-cols-10`}
        >
          {cells.map((value, index) => (
            <Cell
              value={value}
              key={index}
              index={index}
              row={index % Default_Rows_Count}
              col={Math.floor(index / Default_Cols_Count)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
