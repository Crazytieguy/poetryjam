import { doc } from "firebase/firestore";
import React, { FC } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import OneLineForm from "../../components/OneLineForm";
import { appendEntry, poemsColl } from "../../firestore";
import styles from "./poem.module.css";

const ROOT = "_ROOT_";

const Poem: FC = () => {
  const { poemId, lineId } = useParams();
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
  let lineIdx = lineId;
  if (!lineIdx || !Object.hasOwn(poemData.entries, lineIdx)) {
    lineIdx = ROOT;
  }
  const childrenByParent: { [index: string]: string[] | undefined } = {};
  for (const [id, { parent }] of Object.entries(poemData.entries)) {
    (childrenByParent[parent] = childrenByParent[parent] || []).push(id);
  }
  const idxOrder: string[] = [];
  let cur = lineIdx;
  while (true) {
    const curEntry = poemData.entries[cur];
    if (!curEntry) {
      break;
    }
    idxOrder.push(cur);
    cur = curEntry.parent;
  }
  idxOrder.reverse();
  cur = lineIdx;
  while (true) {
    const children = childrenByParent[cur];
    if (!children) {
      break;
    }
    cur = children[0]; // Replace later with branch rating logic
    idxOrder.push(cur);
  }
  return (
    <>
      <h2>{poem.data().title}</h2>
      <ol className={styles.lines}>
        {idxOrder.map((idx) => (
          <li key={idx}>{poemData.entries[idx].content}</li>
        ))}
      </ol>
      <OneLineForm
        placeholder="Enter a line"
        buttonText="Submit line"
        onSubmit={async (content, user) =>
          appendEntry(content, idxOrder.at(-1) || ROOT, { uid: user.uid }, poem)
        }
        condition={(user) =>
          poemData.entries[idxOrder.at(-1) || ""]?.author.uid !== user.uid
        }
      ></OneLineForm>
    </>
  );
};

export default Poem;
