import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePoem from "../components/CreatePoem";
import { auth } from "../firebase";

const Create: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <main>
      <h2>Create a poem</h2>
      <div className="center">
        {user ? (
          <CreatePoem {...{ user }} />
        ) : (
          <div>Must be signed in to add a poem</div>
        )}
      </div>
    </main>
  );
};

export default Create;
