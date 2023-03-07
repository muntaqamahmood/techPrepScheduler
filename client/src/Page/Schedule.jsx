import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker'
import "../Styles/Schedule.css";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log("huh?");
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <div className="schedule">
      <h2>Select Your Available Date for an interview</h2>
      <DateTimePicker onChange={handleDateChange} value={selectedDate} format={"y-MM-dd  h a"} required={true} amPmAriaLabel={"Select AM/PM"
}/>
      <div className="buttons">
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default Schedule;
