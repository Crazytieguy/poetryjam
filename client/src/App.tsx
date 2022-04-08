import React from "react";
import { Outlet } from "react-router-dom";
import SignIn from "./components/SignIn";
import MainNav from "./components/MainNav";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="title">Welcome to PoetryJam!</h1>
        <MainNav />
      </header>
      <Outlet />
    </>
  );
}

export default App;
