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
  const allowedX = [
    [1, 0],
    [-1, 0],
  ];
  const allowedY = [
    [0, 1],
    [0, -1],
  ];
  for (let [x, y] of allowedX) {
    for (let i = 1; i < width; i++) {
      const newX = position.column + x * i;
      if (0 <= newX && newX < width) {
        if (!objects[newX][position.row]) {
          legalMoves.push({ column: newX, row: position.row });
        } else {
          if (objects[newX][position.row].breakable) {
            legalMoves.push({ column: newX, row: position.row });
          }
          break;
        }
      } else {
        break;
      }
    }
  }
  for (let [x, y] of allowedY) {
    for (let j = 1; j < height; j++) {
      const newY = position.row + y * j;
      if (0 <= newY && newY < height) {
        if (!objects[position.column][newY]) {
          legalMoves.push({ column: position.column, row: newY });
        } else {
          if (objects[position.column][newY].breakable) {
            legalMoves.push({ column: position.column, row: newY });
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
      const newX = position.column + x * i;
      const newY = position.row + y * i;
      if (0 <= newX && newX < width && 0 <= newY && newY < height) {
        if (!objects[newX][position.row]) {
          legalMoves.push({ column: newX, row: position.row });
        } else {
          if (objects[newX][position.row].breakable) {
            legalMoves.push({ column: newX, row: position.row });
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
    const newX = position.column + x;
    const newY = position.row + y;
    if (0 <= newX && newX < width && 0 <= newY && newY < height) {
      if (!objects[newX][newY] || objects[newX][newY].breakable) {
        legalMoves.push({ column: newX, row: newY });
      }
    }
  }
  return legalMoves;
}
