import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { FC, useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { appendEntry, Poem, ROOT } from "../../firestore";
import OneLineForm, { OLFProps } from "../OneLineForm";
import styles from "./PoemBody.module.css";

interface Props {
  poem: QueryDocumentSnapshot<Poem>;
  keyOrder: string[];
  setEndLineKey: (value: React.SetStateAction<string>) => void;
}

const PoemBody: FC<Props> = ({ poem, keyOrder, setEndLineKey }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const unsetSelectedIdx = () => setSelectedIdx(null);
  const [user] = useAuthState(auth);
  const autoFocusRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);
  const { entries, title } = poem.data();
  const appendAllowed = (idx: number) =>
    user && user.uid !== entries[keyOrder[idx]]?.author.uid;

  const onLineClick = (idx: number) => {
    if (appendAllowed(idx)) {
      return () => setSelectedIdx(idx);
    }
    return () => alert("Authoring two consecutive lines is not allowed");
  };

  const activeIdx = selectedIdx ?? keyOrder.length - 1;
  const items = keyOrder.map((key, idx) => (
    <li
      key={key}
      onClick={onLineClick(idx)}
      className={idx > activeIdx ? styles.blurred : undefined}
    >
      {entries[key].content}
    </li>
  ));
  if (user && appendAllowed(activeIdx)) {
    const inputFocusBehaviour: Partial<OLFProps> = {};
    if (selectedIdx === null) {
      inputFocusBehaviour.onFocus = () => setSelectedIdx(activeIdx);
    } else {
      inputFocusBehaviour.inputRef = autoFocusRef;
    }
    const onFormSubmit = (content: string) =>
      appendEntry({
        content,
        parent: keyOrder[activeIdx] || ROOT,
        author: { uid: user.uid },
        poem,
      })
        .then(setEndLineKey)
        .then(unsetSelectedIdx);
    const form = (
      <li key="input-form">
        <OneLineForm
          placeholder="Enter a line"
          onBlur={unsetSelectedIdx}
          onFormSubmit={onFormSubmit}
          {...inputFocusBehaviour}
        />
      </li>
    );

    items.splice(activeIdx + 1, 0, form);
  }

  return (
    <>
      <h2 onClick={() => setSelectedIdx(-1)}>{title}</h2>
      <ol className={styles.lines}>{items}</ol>
    </>
  );
};

export default PoemBody;
