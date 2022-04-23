import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import OneLineForm from "../components/OneLineForm";
import { addPoem } from "../firestore";

const Create: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Create a poem</h2>
      <div className="center">
        <OneLineForm
          onSubmit={async (title, user) => {
            await addPoem(title, { uid: user.uid });
            navigate("/");
          }}
          placeholder="Title of your new poem"
          buttonText="Create Poem"
        />
      </div>
    </>
  );
};

export default Create;
