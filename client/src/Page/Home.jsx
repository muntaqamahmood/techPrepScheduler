import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";

const Home = () => {
  const [user, setUser] = useState({});

  function handleCallback(resp) {
    var userObj = jwt_decode(resp.credential);
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj)); // save user object to local storage

    document.getElementById("loginDiv").style.display = "none";

    const createUser = async () => {
      await axios.post("http://localhost:5001/api/users", {
        name: userObj.name,
        email: userObj.email,
      });
    };
    createUser();
  }

  function handleSignOut(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("user"); // remove user object from local storage
    document.getElementById("loginDiv").style.display = "block";
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // check if there is a user object in local storage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id:
            "1019180285041-gm3o00h8ic5tcqn2fqu12ptt5gfl28p9.apps.googleusercontent.com",
          callback: handleCallback,
        });

        google.accounts.id.renderButton(document.getElementById("loginDiv"), {
          theme: "outline",
          size: "large",
        });
      })
      .catch((error) => {
        console.error("Error loading Google Sign-In client library", error);
      });
  }, []);

  return (
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
          {user && (
            <Link to="/profile" state={{ user }}>
              Profile
            </Link>
          )}
          {Object.keys(user).length !== 0 && (
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          )}
        </li>
        <li>
          {user && (
            <Link to="/schedule" state={{ user }}>
              Schedule
            </Link>
          )}
        </li>
        <li>
          <div id="loginDiv"></div>
        </li>
      </ul>

      <div className="slogan">
        <h1 data-text="Sharpen Your Skills, Ace Your Interviews">
          Sharpen Your Skills, Ace Your Interviews
        </h1>
      </div>
    </div>
  );
};

export default Home;
