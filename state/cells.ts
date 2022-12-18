import { atom } from "jotai";
import { Cell } from "../types/types";
import { roomAtom } from "./room";

export const decoratedCellsAtom = atom<Cell[]>([]);
export const cellsAtom = atom<Cell[][]>((get) => {
  const room = get(roomAtom);
  if (!room) return [];
  const { rows, columns } = room;

  const decoratedCells = get(decoratedCellsAtom);
  const cells: Cell[][] = new Array(rows).fill(0).map(() => new Array(columns).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cells[row][column] = {
        room_id: room.id,
        row,
        column,
        type: null,
      };
    }
  }

  for (const decoratedCell of decoratedCells) {
    const { row, column } = decoratedCell;
    cells[row][column] = decoratedCell;
  }

  return cells;
});
