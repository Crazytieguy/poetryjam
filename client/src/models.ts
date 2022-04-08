import { FieldValue, Timestamp } from "firebase/firestore";

export interface Poem {
  firstLine: string;
  createdAt: Timestamp;
  creatorUid: string;
  creatorName?: string;
}

export interface NewPoem extends Omit<Poem, "createdAt"> {
  createdAt: FieldValue;
}
