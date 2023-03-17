import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleCallback(resp) {
    var userObj = jwt_decode(resp.credential);
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj)); // save user object to local storage

    const createUser = async () => {
      await axios.post("http://localhost:5001/api/users", {
        name: userObj.name,
        email: userObj.email,
      });
    };
    createUser();
    navigate("/profile", { state: { user: userObj } });
  }

  function handleSignOut(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("user"); // remove user object from local storage
    window.location.reload();
    navigate("/");
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
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
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
        {Object.keys(user).length === 0 && (
          <li>
            <div id="loginDiv"></div>
          </li>
        )}
        <li>
          {Object.keys(user).length !== 0 && user && (
            <Link to="/profile" state={{ user }}>
              Profile
            </Link>
          )}
        </li>
        <li>
          {Object.keys(user).length !== 0 && (
            <button
              className="signOut-button"
              onClick={(e) => handleSignOut(e)}
            >
              Sign Out
            </button>
          )}
        </li>
      </ul>

      <div className="slogan">
        <h1 data-text="Sharpen Your Skills, Ace Your Interviews">
          Sharpen Your Skills, Ace Your Interviews
        </h1>
        <br></br>
        <br></br>
        <h2>
          Sign in now to get started with your mock interview or host a mock
          interview with a friend! It's free!
        </h2>
      </div>
    </div>
  );
};

export default Home;
