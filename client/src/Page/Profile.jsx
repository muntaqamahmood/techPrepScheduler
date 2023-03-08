import React from "react";
import "../Styles/Profile.css";
import "../Styles/col.css"
import logo from "../media/tpslogo.png";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;

  return (
    <div className="profile">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <br></br>
      <div className="row center">
      <div className="profile-picture-container">
          <img src={user.picture} alt="Logo"></img>
        </div>
      </div>
      <br></br>
      <div className="row center">
        <h3>My Name: {user.name}</h3>
      </div>
      <div className="row center">
        <h3>My Email: {user.email}</h3>
      </div>
      <div className="row center">
        <h3>My Upcoming Interviews: </h3>
      </div>
    </div>
  );
};

export default Profile;