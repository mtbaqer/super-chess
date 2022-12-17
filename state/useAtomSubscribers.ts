import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "../supabase";
import { Player, Room } from "../types/types";
import { isDefined } from "../utils";
import { playersAtom } from "./players";
import { roomAtom } from "./room";

export default function useAtomSubscribers() {
  const router = useRouter();
  const { roomId } = router.query;

  const setRoom = useUpdateAtom(roomAtom);
  const setPlayers = useUpdateAtom(playersAtom);

  useEffect(() => {
    if (roomId) {
      fetchInitialRoom();
      fetchInitialPlayers();

      const unsubscribeToRoom = subscribeToSupabase<Room>("rooms", `id=eq.${roomId}`, onRoomChange);
      const unsubscribeToPlayers = subscribeToSupabase<Player[]>("players", `room_id=eq.${roomId}`, onPlayerChange);
      return () => {
        unsubscribeToRoom();
        unsubscribeToPlayers();
      };
    }
  }, [roomId]);

  async function fetchInitialRoom() {
    const { data } = await supabase.from("rooms").select("*").eq("id", roomId);
    if (data) setRoom(data[0]);
  }

  async function fetchInitialPlayers() {
    const { data } = await supabase.from("players").select("*").eq("room_id", roomId);

    if (data) setPlayers(data);
  }

  type SupaValue = { [key: string]: any };
  function subscribeToSupabase<Value extends SupaValue>(
    table: string,
    filter: string,
    callback: (newValue: Value | {}, oldValue: Value | {}) => void
  ) {
    const channel = supabase
      .channel(`public:${table}:${filter}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter },
        (payload: RealtimePostgresChangesPayload<Value>) => {
          callback(payload.new, payload.old);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  function onRoomChange(room: Room | {}) {
    if (isDefined(room)) {
      setRoom(room);
    }
  }

  function onPlayerChange(newPlayer: Player | {}, oldPlayer: Player | {}) {
    if (isDefined(newPlayer) && isDefined(oldPlayer)) updatePlayer(newPlayer, oldPlayer);
    else if (isDefined(newPlayer)) insertPlayer(newPlayer);
    else if (isDefined(oldPlayer)) deletePlayer(oldPlayer);
  }

  function insertPlayer(newPlayer: Player) {
    setPlayers((players) => {
      if (!players) return;
      return [...players, newPlayer];
    });
  }

  function updatePlayer(newPlayer: Player, oldPlayer: Player) {
    setPlayers((players) => {
      if (!players) return;
      return players.map((player) => (player.id === oldPlayer.id ? newPlayer : player));
    });
  }

  function deletePlayer(oldPlayer: Player) {
    setPlayers((players) => {
      if (!players) return;
      return players.filter((player) => player.id !== oldPlayer.id);
    });
  }

  return {};
}
