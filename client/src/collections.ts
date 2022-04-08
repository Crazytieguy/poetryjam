import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const poemsColl = collection(db, "poems");
export const getEntriesColl = (poemId: string) =>
  collection(poemsColl, poemId, "entries");
