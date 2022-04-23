import { doc } from "firebase/firestore";
import React, { FC, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import PoemBody from "../components/PoemBody";
import { poemsColl, ROOT } from "../firestore";

const PoemRoute: FC = () => {
  const { poemId, lineId } = useParams();
  const [endLineKey, setEndLineKey] = useState(lineId || "");
  const [poem, loading, error] = useDocument(doc(poemsColl, poemId));

  if (!poem) {
    if (loading) {
      return null;
    }
    if (error) {
      return (
        <p>
          Error loading poem {poemId || ""}: {error.message}
        </p>
      );
    }
    return <p>Finished loading without error and got no poem</p>;
  }
  if (!poem.exists()) {
    return <p>This poem does not exist</p>;
  }
  const poemData = poem.data();
  let lineKey = endLineKey;
  if (!endLineKey || !Object.hasOwn(poemData.entries, endLineKey)) {
    lineKey = ROOT;
  }
  const childrenByParent: { [index: string]: string[] | undefined } = {};
  for (const [id, { parent }] of Object.entries(poemData.entries)) {
    (childrenByParent[parent] = childrenByParent[parent] || []).push(id);
  }
  const keyOrder: string[] = [];
  let cur = lineKey;
  while (true) {
    const curEntry = poemData.entries[cur];
    if (!curEntry) {
      break;
    }
    keyOrder.push(cur);
    cur = curEntry.parent;
  }
  keyOrder.reverse();
  cur = lineKey;
  while (true) {
    const children = childrenByParent[cur];
    if (!children) {
      break;
    }
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
