import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { FC, useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { appendEntry, Poem, ROOT } from "../../firestore";
import OneLineForm from "../OneLineForm";
import styles from "./PoemBody.module.css";

interface Props {
  poem: QueryDocumentSnapshot<Poem>;
  keyOrder: string[];
  setEndLineKey: (value: React.SetStateAction<string>) => void;
}

const PoemBody: FC<Props> = ({ poem, keyOrder, setEndLineKey }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const autoFocusRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);

  const appendAllowed = (idx: number) =>
    user && user.uid !== poem.data().entries[keyOrder[idx]]?.author.uid;

  const onLineClick = (idx: number) => {
    if (appendAllowed(idx)) {
      return () => setSelectedIdx(idx);
    }
    return () => alert("Authoring two consecutive lines is not allowed");
  };

  const activeIdx = selectedIdx === null ? keyOrder.length - 1 : selectedIdx;
  const splitAt = activeIdx + 1;

  return (
    <>
      <h2 onClick={() => setSelectedIdx(-1)}>{poem.data().title}</h2>
      <ol className={styles.lines}>
        {keyOrder.slice(0, splitAt).map((key, idx) => (
          <li key={key} onClick={onLineClick(idx)}>
            {poem.data().entries[key].content}
          </li>
        ))}
        {user ? (
          appendAllowed(activeIdx) && (
            <li key="input-form">
              <OneLineForm
                placeholder="Enter a line"
                onBlur={() => setSelectedIdx(null)}
                onFormSubmit={async (content) => {
                  const lineId = await appendEntry(
                    content,
                    keyOrder[activeIdx] || ROOT,
                    { uid: user.uid },
                    poem
                  );
                  setSelectedIdx(null);
                  setEndLineKey(lineId);
                }}
                {...(selectedIdx === null
                  ? {
                      onFocus: () => setSelectedIdx(activeIdx),
                    }
                  : {
                      inputRef: autoFocusRef,
                    })}
              ></OneLineForm>
            </li>
          )
        ) : loading ? null : error ? (
          error.message
        ) : (
          <p>No user signed in</p>
        )}
        {keyOrder.slice(splitAt).map((key, idx) => (
          <li
            key={key}
            onClick={onLineClick(splitAt + idx)}
            className={styles.blurred}
          >
            {poem.data().entries[key].content}
          </li>
        ))}
      </ol>
    </>
  );
};

export default PoemBody;
