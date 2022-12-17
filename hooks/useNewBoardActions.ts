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
    const { data: insertedCells } = await supabase.from("cells").upsert(cells).select();
    if (!insertedCells) return;

    const objects = generateObjects();
    const { data: insertedObjects } = await supabase.from("objects").upsert(objects).select();
    if (!insertedObjects) return;

    const pieces = generatePieces();
    const { data: insertedPieces } = await supabase.from("objects").insert(pieces).select();
    if (!insertedPieces) return;

    updatePlayers(insertedPieces);
    const { data } = await supabase.from("players").upsert(players).select();
  }

  function generateCells() {
    const cells: InsertCell[] = [];
    for (let column = 0; column < Default_Cols_Count; column++) {
      for (let row = 0; row < Default_Rows_Count; row++) {
        // cells.push({ room_id: room.id, row, column });
      }
    }
    return cells;
  }

  function generateObjects() {
    //Don't judge me it's a hackathon
    const objects: InsertGameObject[] = [];
    for (let row = 0; row < room.rows; row++) {
      for (let column = 0; column < room.columns; column++) {
        const randomNumber = Math.random();
        if (randomNumber <= VerySmallChance) {
          const secondRandomNumber = Math.random();
          if (secondRandomNumber <= 0.5) {
            objects.push({
              room_id: room.id,
              row,
              column,
              breakable: false,
              type: "unbreakable",
            });
          } else {
            const modifier = randomModifier();
            objects.push({
              room_id: room.id,
              row,
              column,
              breakable: true,
              modifier,
              type: modifier,
            });
          }
        } else if (randomNumber <= BreakableBlockChance) {
          const block: InsertGameObject = {
            room_id: room.id,
            row,
            column,
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
    }
    return objects;
  }

  function randomModifier() {
    return ModifierTypes[Math.floor(Math.random() * ModifierTypes.length)];
  }

  function generatePieces() {
    const pieces: InsertGameObject[] = [];

    const cornerPositions = [
      [0, 0],
      [0, room.columns - 1],
      [room.rows - 1, 0],
      [room.rows - 1, room.columns - 1],
    ];

    for (let i = 0; i < players.length; i++) {
      const [row, column] = cornerPositions[i];
      pieces.push({
        room_id: room.id,
        row,
        column,
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
