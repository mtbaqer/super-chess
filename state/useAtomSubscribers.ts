import { RealtimePostgresChangesPayload as ChangesPayload } from "@supabase/supabase-js";
import { SetStateAction } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "../supabase";
import { GameObject, Player, Room } from "../types/types";
import { isDefined } from "../logic/utils";
import { decoratedCellsAtom } from "./cells";
import { primitiveGameObjectsAtom } from "./gameObjects";
import { playersAtom } from "./players";
import { roomAtom } from "./room";

type SetAtomFunction<T> = (update: SetStateAction<T[]>) => void;

export default function useAtomSubscribers() {
  const router = useRouter();
  const { roomId } = router.query;

  const setRoom = useUpdateAtom(roomAtom);
  const setPlayers = useUpdateAtom(playersAtom);
  const setCells = useUpdateAtom(decoratedCellsAtom);
  const setGameObjects = useUpdateAtom(primitiveGameObjectsAtom);

  useEffect(() => {
    if (roomId) {
      fetchInitialRoom();
      fetchInitialPlayers();
      fetchInitialCells();
      fetchInitialGameObjects();

      const unsubscribeToRoom = subscribeToSupabase<Room>("rooms", `id=eq.${roomId}`, onRoomChange);
      const unsubscribeToPlayers = subscribeToSupabase<Player>(
        "players",
        `room_id=eq.${roomId}`,
        onArrayChangeFactory(setPlayers)
      );
      const unsubscribeToObjects = subscribeToSupabase<GameObject>(
        "objects",
        `room_id=eq.${roomId}`,
        onArrayChangeFactory(setGameObjects)
      );

      return () => {
        unsubscribeToRoom();
        unsubscribeToPlayers();
        unsubscribeToObjects();
      };
    }
  }, [roomId]);

  async function fetchInitialRoom() {
    const { data } = await supabase.from("rooms").select("*").eq("id", roomId).single();
    if (data) setRoom(data);
  }

  async function fetchInitialPlayers() {
    const { data } = await supabase.from("players").select("*").eq("room_id", roomId);

    if (data) setPlayers(data);
  }

  async function fetchInitialCells() {
    let { data } = await supabase.from("cells").select("*").eq("room_id", roomId).order("row");

    if (data) setCells(data);
  }

  async function fetchInitialGameObjects() {
    let { data } = await supabase.from("objects").select("*").eq("room_id", roomId).order("row").order("column");

    if (data) setGameObjects(data);
  }

  function subscribeToSupabase<Value extends {}>(
    table: string,
    filter: string,
    callback: (payload: ChangesPayload<Value>) => void
  ) {
    const channel = supabase
      .channel(`public:${table}:${filter}`)
      .on("postgres_changes", { event: "*", schema: "public", table, filter }, callback)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  function onRoomChange(room: Room | {}) {
    if (isDefined(room)) {
      setRoom(room);
    }
  }

  function onArrayChangeFactory<T extends { id: number }>(setArray: SetAtomFunction<T>) {
    return (payload: ChangesPayload<T>) => onArrayChange(payload, setArray);
  }

  function onArrayChange<T extends { id: number }>(payload: ChangesPayload<T>, setArray: SetAtomFunction<T>) {
    const { new: newElement, old: oldElement } = payload;

    if (isDefined(newElement) && isDefined(oldElement)) updateArrayElement(newElement, oldElement, setArray);
    else if (isDefined(newElement)) insertElement(newElement, setArray);
    else if (isDefined(oldElement)) deleteElement(oldElement, setArray);
  }

  function updateArrayElement<T extends { id: number }>(
    newElement: T,
    oldElement: Partial<T>,
    setArray: SetAtomFunction<T>
  ) {
    setArray((elements) => {
      return elements.map((element) => (element.id === oldElement.id ? newElement : element));
    });
  }

  function insertElement<T>(newElement: T, setArray: (update: SetStateAction<T[]>) => void) {
    setArray((elements) => {
      return [...elements, newElement];
    });
  }

  function deleteElement<T extends { id: number }>(oldElement: Partial<T>, setArray: SetAtomFunction<T>) {
    setArray((elements) => {
      return elements.filter((element) => element.id !== oldElement.id);
    });
  }

  return {};
}
