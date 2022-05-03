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
    }; // TODO: remove index
  };
}

export const poemsColl = collection(db, "poems") as CollectionReference<Poem>;

export const ROOT = "_ROOT_";

export async function addPoem(title: string, author: PublicUserData) {
  return await addDoc(poemsColl, {
    v: 0,
    title,
    author,
    createdAt: serverTimestamp(),
    entries: {},
  });
}

type AppendEntryArgs = {
  content: string;
  parent: string;
  author: PublicUserData;
  poem: QueryDocumentSnapshot<Poem>;
};

export async function appendEntry({
  content,
  parent,
  author,
  poem,
}: AppendEntryArgs) {
  let lineId;
  const entries = poem.data().entries;
  do {
    lineId = crypto.getRandomValues(new Uint16Array(1))[0].toString(36);
  } while (Object.hasOwn(entries, lineId));
  const data = {
    [`entries.${lineId}`]: {
      parent,
      content,
      author,
      createdAt: serverTimestamp(),
    },
  };
  await updateDoc(poem.ref, data);
  return lineId;
}
