import React, { useState } from "react";
import "../Styles/InterviewList.css";
import axios from "axios";

const InterviewList = ({ interviews, user }) => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
  };

  const handleJoinClick = () => {
    axios
      .put("http://localhost:5001/api/interviews/" + selectedInterview._id, {
        userEmail: user.email,
      })
      .then((response) => {
        setSuccessMessage("Successfully joined interview!");
        setSelectedInterview(null);
        setJoinError(null);
      })
      .catch((error) => {
        console.error(error);
        setJoinError(error.response.data.message);
      });
  };

  return (
    <div className="interview-list">
      <h2>All Interviews you can join :</h2>
      <ul style={{ display: "block" }}>
        {interviews.map((interview) => (
          <li
            key={interview._id}
            onClick={() => handleInterviewClick(interview)}
          >
            <strong>Username:</strong> {interview.creatorName} |{" "}
            <strong>Title:</strong> {interview.title} |{" "}
            <strong>Description:</strong> {interview.description} |{" "}
            <strong>Interview Date:</strong> {interview.date.toString()}
          </li>
        ))}
        {selectedInterview && (
          <div className="popup">
            <p>
              You have selected the interview "{selectedInterview.title}" by{" "}
              {selectedInterview.creatorName}.
            </p>
            {joinError && <p className="error">{joinError}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button onClick={handleJoinClick}>Join Interview</button>
            <button onClick={() => setSelectedInterview(null)}>Cancel</button>
          </div>
        )}
      </ul>
      {joinError && <p className="error">{joinError}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default InterviewList;
