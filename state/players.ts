import { atom } from "jotai";
import { Player } from "../types/types";

export const playersAtom = atom<Player[] | undefined>(undefined);
