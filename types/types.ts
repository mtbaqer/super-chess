import { Database } from "./supabase";

export const PieceTypes = ["king", "knight", "bishop", "rook", "beyonce"] as const;
export type PieceType = typeof PieceTypes[number];
export type Piece = GameObject & {
  type: PieceType;
};

export const ModifierTypes = ["coolDown", "warmUp", ...PieceTypes.map((type) => `${type}_modifier` as const)] as const;
type ModifierType = typeof ModifierTypes[number];

type GameObjectType = PieceType | ModifierType | "unbreakable" | "breakable";

export type Room = Database["public"]["Tables"]["rooms"]["Row"];

export type Player = Database["public"]["Tables"]["players"]["Row"];

export type Cell = Database["public"]["Tables"]["cells"]["Row"];
export type InsertCell = Database["public"]["Tables"]["cells"]["Insert"];

export type GameObject = Database["public"]["Tables"]["objects"]["Row"];
export type InsertGameObject = Database["public"]["Tables"]["objects"]["Insert"] & {
  type: GameObjectType;
  modifier?: ModifierType;
};

export interface Position {
  row: number;
  column: number;
}
