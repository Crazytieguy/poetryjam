import { doc } from "firebase/firestore";
import React, { FC, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import PoemBody from "../components/PoemBody";
import { poemsColl, ROOT } from "../firestore";

const PoemRoute: FC = () => {
  const { poemId, lineId } = useParams();
  const [endLineKey, setEndLineKey] = useState(lineId || "");
  const [poem, , error] = useDocument(doc(poemsColl, poemId));

  if (!poem) {
    if (error) {
      console.error(error);
    }
    return null;
  }
  if (!poem.exists()) {
    return <p>This poem does not exist</p>;
  }
  const entries = poem.data().entries;
  const lineKey = Object.hasOwn(entries, endLineKey) ? endLineKey : ROOT;
  const childrenByParent: { [index: string]: string[] | undefined } = {};
  Object.entries(entries).forEach(([id, { parent }]) => {
    (childrenByParent[parent] = childrenByParent[parent] || []).push(id);
  });
  const keyOrder: string[] = [];
  let cur = lineKey,
    curEntry,
    children;
  while ((curEntry = entries[cur])) {
    keyOrder.push(cur);
    cur = curEntry.parent;
  }
  keyOrder.reverse();
  cur = lineKey;
  while ((children = childrenByParent[cur])) {
    cur = children[Math.floor(Math.random() * children.length)]; // Replace later with branch rating logic
    keyOrder.push(cur);
  }
  const shouldBeEndLineKey = keyOrder.at(-1) || ROOT;
  if (endLineKey !== shouldBeEndLineKey) {
    setEndLineKey(shouldBeEndLineKey);
  }

  return <PoemBody {...{ poem, keyOrder, setEndLineKey }} />;
};

export default PoemRoute;
