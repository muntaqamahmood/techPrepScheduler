import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Page/Home";
import Schedule from "./Page/Schedule";
import MockInterview from "./Page/MockInterview";
import reportWebVitals from "./reportWebVitals";
import AboutUs from "./Page/AboutUs";
import Profile from "./Page/Profile";
import Whiteboard from "./Page/whiteboard";
import Feedback from "./Page/Feedback";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/aboutus" exact element={<AboutUs />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/schedule" exact element={<Schedule />} />
      <Route path="/whiteboard" exact element={<Whiteboard />} />
      <Route path="/mockinterview" exact element={<MockInterview />} />
      <Route path="/feedback" exact element={<Feedback />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
