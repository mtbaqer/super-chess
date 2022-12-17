import { Database } from "./supabase";

export type Room = Database["public"]["Tables"]["rooms"]["Row"];
