import { useAtomValue } from "jotai";
import { useState } from "react";
import { Colors, Default_Cols_Count, Default_Rows_Count } from "../constants";
import { playersAtom } from "../state/players";
import { roomAtom } from "../state/room";
import supabase from "../supabase";
import { Cell, GameObject, InsertCell, InsertGameObject, ModifierTypes } from "../types/types";

const VerySmallChance = 0.01;
const BreakableBlockChance = 0.2;
const ModifierInBlockChance = 0.2;

export default function useNewBoardActions() {
  const room = useAtomValue(roomAtom)!;
  const players = useAtomValue(playersAtom)!;

  async function generateNewBoard() {
    const cells = generateCells();
    const { data: insertedCells } = await supabase.from("cells").insert(cells).select();
    if (!insertedCells) return;

    const objects = generateObjects(insertedCells);
    const { data: insertedObjects } = await supabase.from("objects").insert(objects).select();
    if (!insertedObjects) return;

    const pieces = generatePieces(insertedCells);
    const { data: insertedPieces } = await supabase.from("objects").insert(pieces).select();
    if (!insertedPieces) return;

    updatePlayers(insertedPieces);
    const { data } = await supabase.from("players").upsert(players).select();
  }

  function generateCells() {
    const cells: InsertCell[] = [];
    for (let column = 0; column < Default_Cols_Count; column++) {
      for (let row = 0; row < Default_Rows_Count; row++) {
        cells.push({ room_id: room.id, row, column });
      }
    }
    return cells;
  }

  function generateObjects(cells: Cell[]) {
    //Don't judge me it's a hackathon
    const objects: InsertGameObject[] = [];
    for (const cell of cells) {
      const randomNumber = Math.random();
      if (randomNumber <= VerySmallChance) {
        const secondRandomNumber = Math.random();
        if (secondRandomNumber <= 0.5) {
          objects.push({
            cell_id: cell.id,
            breakable: false,
            type: "unbreakable",
          });
        } else {
          const modifier = randomModifier();
          objects.push({
            cell_id: cell.id,
            breakable: true,
            modifier,
            type: modifier,
          });
        }
      } else if (randomNumber <= BreakableBlockChance) {
        const block: InsertGameObject = {
          cell_id: cell.id,
          breakable: true,
          type: "breakable",
        };
        const secondRandomNumber = Math.random();
        if (secondRandomNumber <= ModifierInBlockChance) {
          const modifier = randomModifier();
          block.modifier = modifier;
          block.type = modifier;
        }
      }
    }
    return objects;
  }

  function randomModifier() {
    return ModifierTypes[Math.floor(Math.random() * ModifierTypes.length)];
  }

  function generatePieces(cells: Cell[]) {
    const pieces: InsertGameObject[] = [];

    const cornerIndexes = [
      0,
      Default_Rows_Count - 1,
      Default_Rows_Count * (Default_Cols_Count - 1),
      Default_Rows_Count * Default_Cols_Count - 1,
    ];

    for (let i = 0; i < players.length; i++) {
      pieces.push({
        cell_id: cells[cornerIndexes[i]].id,
        breakable: true,
        type: "king",
        modifier: "king_modifier",
      });
    }

    return pieces;
  }

  function updatePlayers(pieces: GameObject[]) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const piece = pieces[i];
      player.piece_id = piece.id;
      player.color = Colors[i];
    }
  }

  return { generateNewBoard };
}
