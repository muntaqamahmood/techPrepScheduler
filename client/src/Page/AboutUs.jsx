import React from "react";
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";

function AboutUs() {
  return (
    <body>
      <div className="Aboutus">
        <div className="logo">
          <img src={logo} alt="Logo"></img>
        </div>

        <ul>
          <li>
            {" "}
            <a href="http://localhost:3000/">Home</a>{" "}
          </li>
          <li className="active">
            {" "}
            <a href="/">AboutUs</a>{" "}
          </li>
        </ul>

        <br></br>
        <br></br>
        
        <div className="aboutus-title">
          {" "}
          Description of our web application
        </div>
        <br></br>

        <div className="aboutus-element">
          TechPrep Scheduler is a web application to give computer science and
          software engineering professionals a realistic environment to prepare
          for technical interviews. Users can schedule mock interviews with
          other users and conduct mock interviews in real-time using our
          platform's live code editor and compiler, as well as its chat and
          voice chat features. Users can select to either be the interviewer or
          the interviewee when using TechPrep Scheduler. Users can ask
          questions, provide feedback, write and review code all through our
          platform's code editor, chat and voice chat features.
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="aboutus-title"> Features </div>
        <br></br>

        <div className="aboutus-element">
          Live Code Editor, Live Compiler, User Authentication, User Profiles,
          User Scheduling, User Feedback with Webcam, Voice chat & Text Chat.
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="aboutus-title"> Team Memebers </div>
        <div className="aboutus-element">
          Andrew Qian, Shence Yang, Muntaqa Mahmood
        </div>
      </div>
    </body>
  );
}

export default AboutUs;
