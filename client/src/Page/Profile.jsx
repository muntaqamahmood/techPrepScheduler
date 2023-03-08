import React from "react";
import "../Styles/Profile.css";
import logo from "../media/tpslogo.png";

const Profile = ( { user } ) => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="Profile">
      <p>ID: {user.userId}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
    </div>
  );
};

export default Profile;
