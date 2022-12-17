import { atom } from "jotai";
import { Room } from "../types/types";
import { atomWithStorage } from "jotai/utils";
import { AsyncStorage } from "jotai/utils/atomWithStorage";
import supabase from "../supabase";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";

// const supaStorage: AsyncStorage<Room | null> = {
//   getItem: async (key) => {
//     const { data } = await supabase.from("rooms").select("*").eq("id", key);
//     return data?.[0] ?? null;
//   },
//   setItem: async (key, newValue) => {
//     if (newValue) await supabase.from("rooms").update(newValue).eq("id", key);
//   },
//   removeItem: async (key: string) => {
//     //Cause nah.
//   },
//   subscribe: (key: string, callback: (room: Room) => void) => {
//     const channel = supabase
//       .channel(`public:rooms:id=eq.${key}`)
//       .on(
//         "postgres_changes",
//         { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${key}` },
//         (payload: RealtimePostgresUpdatePayload<Room>) => callback(payload.new)
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   },
// };

// const atomWithSupabase = (key: string, initialValue: Room | null) =>
//   atomWithStorage<Room | null>(key, initialValue, supaStorage);

export const roomAtom = atom<Room | undefined>(undefined);
