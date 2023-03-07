import React from "react";
import "../Styles/Profile.css";
import logo from "../media/tpslogo.png";

const Profile = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="row">
        <div className="col-auto"></div>
        <div className="col-auto">
          <div className="profile">
            <div className="profile-title">Profile</div>
            <div className="profile-text">Name: </div>
            <div className="profile-text">Email: </div>
          </div>
        </div>
        <div className="col-auto"></div>
      </div>
    </div>
  );
};

export default Profile;
