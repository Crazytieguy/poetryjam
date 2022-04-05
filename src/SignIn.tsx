import React from "react";
import { FC } from "react";
import { auth } from "./firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const SignIn: FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Initialising User...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (user) {
    return (
      <>
        <p>Current User: {user.email}</p>
        <button onClick={() => signOut(auth)}>Sign out</button>
      </>
    );
  }
  return <GoogleSignIn />;
};

const GoogleSignIn: FC = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return <button onClick={() => signInWithGoogle()}>Sign In</button>;
};

export default SignIn;
