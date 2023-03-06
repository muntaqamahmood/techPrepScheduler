import React from "react";
// import AboutUs from './AboutUs'
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";
import LoginButton from "../Components/login-button";

const Home = () => {
  return (
    <body>
      <div className="Homepage">
        <div className="logo">
          <img src={logo} alt="Logo"></img>
        </div>

        <ul>
          <li className="active">
            {" "}
            <a href="/">Home</a>{" "}
          </li>
          <li>
            {" "}
            <a href="aboutus">AboutUs</a>{" "}
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>

        <div className="slogan">
          <h1 data-text="Sharpen Your Skills, Ace Your Interviews">
            {" "}
            Sharpen Your Skills, Ace Your Interviews
          </h1>
          <br></br>
          <h2>
            Practice with Realistic Mock Technical Interviews on Our Platform
          </h2>
        </div>
      </div>
    </body>
  );
};

export default Home;
