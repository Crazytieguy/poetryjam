import { poemsColl } from "../collections";
import { useCollection } from "react-firebase-hooks/firestore";
import { limit, Query, query } from "firebase/firestore";
import React, { FC } from "react";
import { Poem } from "../models";
import PoemItem from "./PoemItem";
import styles from "./PoemList.module.css";

const poemQuery = query(poemsColl, limit(10)) as Query<Poem>;

const PoemList: FC = () => {
  const [poems, loading, error] = useCollection(poemQuery);
  if (loading) {
    return <p>Loading poems...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
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
