import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import OneLineForm from "../components/OneLineForm";
import { auth } from "../firebase";
import { addPoem } from "../firestore";

const Create: FC = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <h2>Create a poem</h2>
      <div className="center">
        {user ? (
          <OneLineForm
            onFormSubmit={async (title) => {
              await addPoem(title, { uid: user.uid });
              navigate("/");
            }}
            placeholder="Title of your new poem"
          />
        ) : loading ? null : error ? (
          error.message
        ) : (
          <p>No user signed in</p>
        )}
      </div>
    </>
  );
};

export default Create;
