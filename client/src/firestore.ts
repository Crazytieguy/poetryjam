import { db } from "./firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  serverTimestamp,
  updateDoc,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export interface PublicUserData {
  uid: string;
  displayName?: string;
}

export interface Poem {
  v: 0;
  title: string;
  author: PublicUserData;
  createdAt: Timestamp;
  entries: {
    [index: string]: {
      parent: string;
      content: string;
      author: PublicUserData;
      createdAt: Timestamp;
    }; // should remove index
  };
}

export const poemsColl = collection(db, "poems") as CollectionReference<Poem>;

export async function addPoem(title: string, author: PublicUserData) {
  return await addDoc(poemsColl, {
    v: 0,
    title,
    author,
    createdAt: serverTimestamp(),
    entries: {},
  });
}

export async function appendEntry(
  content: string,
  parent: string,
  author: PublicUserData,
  poem: QueryDocumentSnapshot<Poem>
) {
  let lineId;
  do {
    lineId = crypto.getRandomValues(new Uint16Array(1))[0].toString(36);
  } while (Object.hasOwn(poem.data().entries, lineId));
  const data = {
    [`entries.${lineId}`]: {
      parent,
      content,
      author,
      createdAt: serverTimestamp(),
    },
  };
  return await updateDoc(poem.ref, data);
}
