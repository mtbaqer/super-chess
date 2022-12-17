import { atom } from "jotai";
import { Room } from "../types/types";

export const roomAtom = atom<Room | undefined>(undefined);
