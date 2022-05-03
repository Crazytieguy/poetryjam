import React, { FC } from "react";
import { auth } from "../../firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const SignIn: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (user) {
    return <button onClick={() => signOut(auth)}>Sign out</button>;
  }
  return <GoogleSignIn>{children || "Sign In"}</GoogleSignIn>;
};

const GoogleSignIn: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return <button onClick={() => signInWithGoogle()}>{children}</button>;
};

export default SignIn;
