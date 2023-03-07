import React from "react";
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";
import { useEffect } from "react";

const Home = () => {

  function handleCallback(resp) {
    console.log("Encoded JWT ID token: " + resp.credential);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1019180285041-gm3o00h8ic5tcqn2fqu12ptt5gfl28p9.apps.googleusercontent.com",
      callback: handleCallback
    });

    google.accounts.id.renderButton(
      document.getElementById("loginDiv"),
      { theme: "outline", size: "large" }
    );

  }, []);

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
            <div id="loginDiv"></div>
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
