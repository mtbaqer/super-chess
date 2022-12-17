import { atom } from "jotai";
import { Cell } from "../types/types";
import { roomAtom } from "./room";

export const decoratedCellsAtom = atom<Cell[]>([]);
export const cellsAtom = atom<Cell[]>((get) => {
  const room = get(roomAtom);
  if (!room) return [];
  const { rows, columns } = room;

  const cells: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cells.push({
        room_id: room.id,
        row,
        column,
        type: null,
      });
    }
  }

  const decoratedCells = get(decoratedCellsAtom);
  for (let decoratedCell of decoratedCells) {
    cells[decoratedCell.row + decoratedCell.column] = decoratedCell;
  }

  return cells;
});
