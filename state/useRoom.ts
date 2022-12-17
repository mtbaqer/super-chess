import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "../supabase";
import { Room } from "../types/types";
import { roomAtom } from "./room";

export default function useAtomSubscribers() {
  const router = useRouter();
  const { roomId } = router.query;

  const setRoom = useUpdateAtom(roomAtom);

  useEffect(() => {
    if (roomId) {
      fetchInitialRoom();

      const unsubscribe = subscribeToRoom();
      return () => {
        unsubscribe();
      };
    }
  }, [roomId]);

  async function fetchInitialRoom() {
    const { data } = await supabase.from("rooms").select("*").eq("id", roomId);
    if (data) setRoom(data[0]);
  }

  function subscribeToRoom() {
    const channel = supabase
      .channel(`public:rooms:id=eq.${roomId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
        (payload: RealtimePostgresUpdatePayload<Room>) => {
          setRoom(payload.new);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  return {};
}
