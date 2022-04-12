import { FieldValue, Timestamp } from "firebase/firestore";

export interface Poem {
  version: 0;
  firstLine: string;
  createdAt: Timestamp;
  creatorUid: string;
  creatorName?: string;
}

export interface NewPoem extends Omit<Poem, "createdAt"> {
  createdAt: FieldValue;
}
