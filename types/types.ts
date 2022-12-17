import { Database } from "./supabase";

const PieceTypes = ["king", "knight", "bishop", "rook", "beyonce"] as const;
export const Modifiers = ["coolDown", "warmUp", ...PieceTypes.map((type) => `${type}_modifier` as const)] as const;
type GameObjectType = typeof Modifiers[number] | "unbreakable" | "breakable";

export type Room = Database["public"]["Tables"]["rooms"]["Row"];
export type Player = Database["public"]["Tables"]["players"]["Row"];
export type InsertedCell = Database["public"]["Tables"]["cells"]["Insert"];
export type InsertedGameObject = Database["public"]["Tables"]["objects"]["Insert"] & { type: GameObjectType };
