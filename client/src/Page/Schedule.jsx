import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import "../Styles/Schedule.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDateChange = (date) => {
    console.log("huh?");
    console.log(date);
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = axios.post("/api/schedule", {
      userId: "testUserId",
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

  return (
    <div className="schedule">
      <h2>Select Your Available Date for an interview</h2>
      <form onSubmit={handleSubmit}>
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
  );
};

export default Schedule;
