import React, { useState } from "react";
import "../Styles/InterviewList.css";
import axios from "axios";

const InterviewList = ({ interviews }) => {
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
  };

  const handleJoinClick = () => {
    console.log("Joining interview...");
    console.log(selectedInterview);
    const res = axios.put("/api/interviews/" + selectedInterview._id, {});
  };

  return (
    <div className="interview-list">
      <h2>All Interviews:</h2>
      <ul>
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
            <button onClick={handleJoinClick}>Join Interview</button>
            <button onClick={() => setSelectedInterview(null)}>Cancel</button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default InterviewList;
