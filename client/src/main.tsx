import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./reset.css";
import "./index.css";
import Create from "./routes/create";
import Home from "./routes/home";
import PoemRoute from "./routes/poem";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="poem/:poemId" element={<PoemRoute />} />
          <Route path="poem/:poemId/:lineId" element={<PoemRoute />} />
          <Route path="create" element={<Create />} />
          <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
