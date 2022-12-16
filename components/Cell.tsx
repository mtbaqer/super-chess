import React, { FunctionComponent } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Image from "next/image";
import Bishop from "./pieces/Bishop";

interface Props {
  row: number;
  col: number;
}

const Cell: FunctionComponent<Props> = ({ row, col }) => {
  return (
    // <Droppable
    //   key={id}
    //   droppableId={id}
    //   type=""
    //   direction="horizontal"
    //   ignoreContainerClipping={false}
    //   isCombineEnabled={false}
    // >
    //   {(provided: DroppableProvided) => (
    // <div ref={provided.innerRef} {...provided.droppableProps} className="">
    <div
      className={`${
        (row + col) % 2 === 0 ? "bg-board-black" : "bg-board-white"
      } 
      grid place-content-center p-2 max-w-xs max-h-xs`}
    >
      <Bishop />
    </div>
    //   {provided.placeholder}
    // </div>
    //   )}
    // </Droppable>
  );
};

export default Cell;
