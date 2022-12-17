import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import React, { FunctionComponent, useState } from "react";
import { cellsAtom } from "../../state/cells";
import Cell from "./Cell";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const cells = useAtomValue(cellsAtom);

  function onDragStart(event: DragStartEvent) {}
  function onDragEnd(event: DragEndEvent) {
    // const { over, active } = event;
    // if (over) {
    //   setCells((cells) => {
    //     const newCells = [...cells];
    //     newCells[Number(active.id)] = 0;
    //     newCells[Number(over.id)] = 1;
    //     return newCells;
    //   });
    // }
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex">
        <div
          //TODO: Change grid-row & grid-cols to use dynamic.
          className={`bg-red-500 grid grid-cols-10`}
        >
          {cells.map((cell, index) => (
            <Cell key={index} cell={cell} index={index} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
