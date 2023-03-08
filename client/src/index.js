import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Page/Home";
import Schedule from "./Page/Schedule";
import reportWebVitals from "./reportWebVitals";
import AboutUs from "./Page/AboutUs";
import Profile from "./Page/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/aboutus" exact element={<AboutUs />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/schedule" exact element={<Schedule />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
