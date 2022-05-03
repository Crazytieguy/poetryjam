import React, { FC } from "react";
import PoemList from "../components/PoemList";

const Home: FC = () => (
  <>
    <h2>Top poems:</h2>
    <div className="center">
      <PoemList></PoemList>
    </div>
  </>
);

export default Home;
