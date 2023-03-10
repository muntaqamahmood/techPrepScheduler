import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import "../Styles/col.css";
import logo from "../media/tpslogo.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import InterviewList from "./InterviewList";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  const [interviewsJoined, setInterviewsJoined] = useState([]);
  // const [interviewsPosted, setInterviewsPosted] = useState([]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/interviews/usersEmail/${user.email}`
        );
        setInterviewsJoined(res.data.interviewsJoined);
        // setInterviewsPosted(res.data.interviewsPosted);
      } catch (err) {
        console.log(err);
      }
    };

    getInterviews();
  }, [user.email]);

  return (
    <div className="profile">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <br></br>
      <ul>
        <li>
          {" "}
          <a href="/">Home</a>{" "}
        </li>
        <li>
          {user && (
            <Link to="/schedule" state={{ user }}>
              Schedule
            </Link>
          )}
        </li>
      </ul>
      <div className="row center">
        <div className="profile-picture-container">
          <img src={user.picture} alt="Profile"></img>
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
      <InterviewList interviews={interviewsJoined} user={user} />
    </div>
  );
};

export default Profile;
