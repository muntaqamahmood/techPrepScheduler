import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import "../Styles/Schedule.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useLocation } from "react-router-dom";
import InterviewList from "./InterviewList";
import { Link } from "react-router-dom";

const Schedule = () => {
  const location = useLocation();
  const user = location.state.user;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/interviews/", {
      userEmail: user.email,
      title,
      description,
      selectedDate,
    });

    console.log("Submitting form...");
    console.log("Selected date:", selectedDate);
    console.log("Title:", title);
    console.log("Description:", description);
    // Reset form values
    setSelectedDate(new Date());
    setTitle("");
    setDescription("");
  };

  const hideShow = () => {
    const toggle_button = document.querySelector(".toggle-btn");
    const hideorshow = document.querySelector(".toggle-btn").innerHTML;
    const formelement = document.querySelector(".schedule-form");
    if (hideorshow === "Hide") {
      formelement.style.display = "none";
      toggle_button.innerHTML = "Show";
    } else {
      formelement.style.display = "block";
      toggle_button.innerHTML = "Hide";
    }
  };

  useEffect(() => {
    const fetchInterviewData = async () => {
      const res = await axios.get("http://localhost:5001/api/interviews/all");
      console.log("Fetching interview data...");
      console.log(res);
      setInterviewData(res.data);
    };
    fetchInterviewData();
  }, []);

  return (
    <div>

<ul>
        <li className="active">
          {" "}
          <a href="/schedule">Schedule</a>{" "}
        </li>
        <li>
          {Object.keys(user).length !== 0 && user && (
            <Link to="/profile" state={{ user }}>
              Profile
            </Link>
          )}
        </li>
      </ul>


      <div className="schedule">
        <div className="schedule-title">
          <div className="title-text">Create An Interview</div>
          <button
            type="button"
            className="toggle-btn"
            id="toggle"
            onClick={hideShow}
          >
            Hide
          </button>
        </div>
        <form className="schedule-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="datetime">Date and Time:</label>

          <DateTimePicker
            id="datetime"
            onChange={handleDateChange}
            value={selectedDate}
            format={"y-MM-dd  h a"}
            required
            amPmAriaLabel={"Select AM/PM"}
          />

          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <InterviewList interviews={interviewData} user={user} />

      
    </div>
  );
};

export default Schedule;
