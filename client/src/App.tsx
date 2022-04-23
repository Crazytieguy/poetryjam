import { signInAnonymously } from "firebase/auth";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";
import { auth } from "./firebase";

function App() {
  useEffect(() => {
    if (!auth.currentUser) {
      signInAnonymously(auth).then(console.log);
    }
  }, []);
  return (
    <>
      <header className="header">
        <h1 className="title">Welcome to PoetryJam!</h1>
        <MainNav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
