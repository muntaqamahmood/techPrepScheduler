import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import "../Styles/col.css";
import logo from "../media/tpslogo.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  const [interviewsJoined, setInterviewsJoined] = useState([]);
  const [interviewsPosted, setInterviewsPosted] = useState([]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/interviews/usersEmail/${user.email}`
        );
        setInterviewsJoined(res.data.interviewsJoined);
        setInterviewsPosted(res.data.interviewsPosted);
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
      {/* <hr></hr> */}
      <br></br>
      <div className="row center">
        <h3>My Joined Interviews: </h3>
      </div>
      <div className="row center">
        {interviewsJoined.length > 0 ? (
          <ul className="interview-list">
            {interviewsJoined.map((interview) => (
              <li key={interview._id} className="interview-item">
                <div className="interview-details">
                  <div className="interview-detail">
                    <strong>Title:</strong> {interview.title}
                  </div>
                  <div className="interview-detail">
                    <strong>Desc:</strong> {interview.description}
                  </div>
                  <div className="interview-detail">
                    <strong>Date:</strong>{" "}
                    {new Date(interview.date).toLocaleDateString()}
                  </div>
                  <div className="interview-detail">
                    <strong>Time:</strong>{" "}
                    {new Date(interview.date).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming interviews</p>
        )}
      </div>

      {/* <hr></hr> */}
      <br></br>
      <div className="row center">
        <h3>My Posted Interviews: </h3>
      </div>
      <div className="row center">
        {interviewsPosted.length > 0 ? (
          <ul className="interview-list">
            {interviewsPosted.map((interview) => (
              <li key={interview._id} className="interview-item">
                <div className="interview-details">
                  <div className="interview-detail">
                    <strong>Title:</strong> {interview.title}
                  </div>
                  <div className="interview-detail">
                    <strong>Desc:</strong> {interview.description}
                  </div>
                  <div className="interview-detail">
                    <strong>Date:</strong>{" "}
                    {new Date(interview.date).toLocaleDateString()}
                  </div>
                  <div className="interview-detail">
                    <strong>Time:</strong>{" "}
                    {new Date(interview.date).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posted interviews</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
