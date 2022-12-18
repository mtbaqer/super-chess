import { GameObject, PieceType, Position } from "../types/types";

export function getLegalMoves(
  pieceType: PieceType,
  oldPosition: Position,
  objects: GameObject[][],
  width: number,
  height: number
): Position[] {
  switch (pieceType) {
    case "king":
      return getKingLegalMoves(oldPosition, objects, width, height);
    case "knight":
      return getKnightLegalMoves(oldPosition, objects, width, height);
    case "bishop":
      return getBishopLegalMoves(oldPosition, objects, width, height);
    case "rook":
      return getRookLegalMoves(oldPosition, objects, width, height);
    case "beyonce":
      return getBeyonceLegalMoves(oldPosition, objects, width, height);
    default:
      return [];
  }
}

function getBeyonceLegalMoves(position: Position, objects: GameObject[][], width: number, height: number): Position[] {
  return [
    ...getRookLegalMoves(position, objects, width, height),
    ...getBishopLegalMoves(position, objects, width, height),
  ];
}

function getRookLegalMoves(position: Position, objects: GameObject[][], width: number, height: number): Position[] {
  const legalMoves: Position[] = [];
  const allowedColumnDirections = [
    [1, 0],
    [-1, 0],
  ];
  const allowedRowDirections = [
    [0, 1],
    [0, -1],
  ];
  for (let [x, y] of allowedColumnDirections) {
    for (let i = 1; i < width; i++) {
      const newColumn = position.column + x * i;
      if (0 <= newColumn && newColumn < width) {
        if (!objects[position.row][newColumn]) {
          legalMoves.push({ column: newColumn, row: position.row });
        } else {
          if (objects[position.row][newColumn].breakable) {
            legalMoves.push({ column: newColumn, row: position.row });
          }
          break;
        }
      } else {
        break;
      }
    }
  }
  for (let [x, y] of allowedRowDirections) {
    for (let j = 1; j < height; j++) {
      const newRow = position.row + y * j;
      if (0 <= newRow && newRow < height) {
        if (!objects[newRow][position.column]) {
          legalMoves.push({ column: position.column, row: newRow });
        } else {
          if (objects[newRow][position.column].breakable) {
            legalMoves.push({ column: position.column, row: newRow });
          }
          break;
        }
      } else {
        break;
      }
    }
  }
  return legalMoves;
}

function getBishopLegalMoves(position: Position, objects: GameObject[][], width: number, height: number): Position[] {
  const legalMoves: Position[] = [];
  const allowedDirections = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];
  for (let [x, y] of allowedDirections) {
    for (let i = 1; i < Math.min(width, height); i++) {
      const newColumn = position.column + x * i;
      const newRow = position.row + y * i;

      if (0 <= newColumn && newColumn < width && 0 <= newRow && newRow < height) {
        if (!objects[newRow][newColumn]) {
          legalMoves.push({ column: newColumn, row: newRow });
        } else {
          if (objects[newRow][newColumn].breakable) {
            legalMoves.push({ column: newColumn, row: newRow });
          }
          break;
        }
      } else {
        break;
      }
    }
  }
  return legalMoves;
}

function getKingLegalMoves(oldPosition: Position, objects: GameObject[][], width: number, height: number): Position[] {
  const kingMoves = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  return getValidMoves(kingMoves, oldPosition, objects, width, height);
}

function getKnightLegalMoves(position: Position, objects: GameObject[][], width: number, height: number): Position[] {
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [2, 1],
    [2, -1],
    [1, -2],
    [1, 2],
    [-1, 2],
    [-1, -2],
  ];
  return getValidMoves(knightMoves, position, objects, width, height);
}

function getValidMoves(
  pieceMoves: number[][],
  position: Position,
  objects: GameObject[][],
  width: number,
  height: number
) {
  const legalMoves: Position[] = [];
  for (let [x, y] of pieceMoves) {
    const newColumn = position.column + x;
    const newRow = position.row + y;
    if (0 <= newColumn && newColumn < width && 0 <= newRow && newRow < height) {
      if (!objects[newRow][newColumn] || objects[newRow][newColumn].breakable) {
        legalMoves.push({ column: newColumn, row: newRow });
      }
    }
  }
  return legalMoves;
}
