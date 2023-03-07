import React from "react";
import "../Styles/InterviewList.css";

const InterviewList = ({ interviews }) => {
  return (
    <div className="interview-list">
      <h2>All Interviews:</h2>
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id}>
            <strong>Username:</strong> {interview.creator} |{" "}
            <strong>Title:</strong> {interview.title} |{" "}
            <strong>Description:</strong> {interview.description} |{" "}
            <strong>Interview Date:</strong> {interview.date.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewList;
