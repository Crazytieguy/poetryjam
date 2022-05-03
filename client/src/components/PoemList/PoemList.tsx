import { poemsColl } from "../../firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { limit, query } from "firebase/firestore";
import React, { FC } from "react";
import PoemItem from "../PoemItem";
import styles from "./PoemList.module.css";

const poemQuery = query(poemsColl, limit(10));

const PoemList: FC = () => {
  const [poems, loading, error] = useCollection(poemQuery);
  if (loading) {
    return null;
  }
  if (error) {
    return <p>Error loading poems: {error.message}</p>;
  }
  if (!poems || poems.empty) {
    return <p>No poems exist yet!</p>;
  }
  return (
    <ul className={styles.poemList}>
      {poems?.docs.map((poem) => (
        <li key={poem.id}>
          <PoemItem {...{ poem }} />
        </li>
      ))}
    </ul>
  );
};

export default PoemList;
