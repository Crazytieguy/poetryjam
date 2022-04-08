import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Poem } from "../models";
import styles from "./PoemItem.module.css";

const PoemItem: FC<{ poem: QueryDocumentSnapshot<Poem> }> = ({ poem }) => {
  return (
    <h3>
      <Link to={`/poem/${poem.id}`} className={styles.poemItem}>
        {poem.data().firstLine}
      </Link>
    </h3>
  );
};

export default PoemItem;
