import { GameObject, Piece, PieceTypes } from "./types/types";

export function isDefined<T extends {}>(obj: T | {}): obj is T {
  return Object.keys(obj).length !== 0;
}

export function isPiece(obj: GameObject | undefined): obj is Piece {
  return obj !== undefined && PieceTypes.includes(obj.type as any);
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
