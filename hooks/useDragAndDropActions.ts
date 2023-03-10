import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { getLegalMoves } from "../logic/chessRules";
import { toKey } from "../logic/utils";
import { gameObjectsAtom } from "../state/gameObjects";
import { roomAtom } from "../state/room";
import supabase from "../supabase";
import { Cell, Piece } from "../types/types";

export default function useDragAndDropActions() {
  const room = useAtomValue(roomAtom)!;
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

  async function onDragEnd(event: DragEndEvent) {
    const cell = event.over?.data.current as any as Cell;
    if (cell && isLegalMove(cell.row, cell.column)) {
      const piece = event.active.data.current as any as Piece;

      const newPiece: Piece = { ...piece, row: cell.row, column: cell.column };

      await supabase.from("objects").update(newPiece).eq("id", newPiece.id);
    }
    setLegalMoves(new Set());
  }

  function isLegalMove(row: number, column: number) {
    return legalMoves.has(toKey(row, column));
  }

  return { onDragStart, onDragEnd, isLegalMove };
}
