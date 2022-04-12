import { User } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { poemsColl } from "../collections";
import { NewPoem } from "../models";
import styles from "./CreatePoem.module.css";

const CreatePoem: FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [firstLine, setFirstLine] = useState("");

  const addPoem = async (e: FormEvent) => {
    e.preventDefault();
    const poem: NewPoem = {
      version: 0,
      firstLine: firstLine,
      createdAt: serverTimestamp(),
      creatorUid: user.uid,
      ...(user.displayName && { creatorName: user.displayName }),
    };
    await addDoc(poemsColl, poem);
    navigate("/");
  };

  return (
    <form onSubmit={addPoem} className={styles.form}>
      <div>
        <input
          value={firstLine}
          onChange={(e) => setFirstLine(e.target.value)}
          placeholder="First line of your new poem"
        />
      </div>

      <button type="submit" disabled={!firstLine}>
        Create Poem
      </button>
    </form>
  );
};

export default CreatePoem;
