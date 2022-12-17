import { atom } from "jotai";
import { GameObject } from "../types/types";
import { roomAtom } from "./room";

export const primitiveGameObjectsAtom = atom<GameObject[]>([]);
export const gameObjectsAtom = atom<GameObject[][]>((get) => {
  const room = get(roomAtom);
  if (!room) return [];
  const { rows, columns } = room;

  const flatArray = get(primitiveGameObjectsAtom);
  const twoDimensionalArray = new Array(rows).fill(0).map(() => new Array(columns).fill(undefined));

  for (const gameObject of flatArray) {
    const { row, column } = gameObject;
    twoDimensionalArray[row][column] = gameObject;
  }

  return twoDimensionalArray;
});
