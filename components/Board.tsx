import React, { FunctionComponent } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Default_Cols_Count, Default_Rows_Count } from "../constants";
import Cell from "./Cell";

const Rows = Array(Default_Rows_Count).fill(0);
const Cols = Array(Default_Cols_Count).fill(0);

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex">
        <div
          className={`bg-red-500 grid grid-row-${Default_Rows_Count} grid-cols-${Default_Cols_Count} grid-flow-row`}
        >
          {Rows.map((_, row) =>
            Cols.map((_, col) => <Cell key={col} row={row} col={col} />)
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
