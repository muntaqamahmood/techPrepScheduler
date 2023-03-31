# Project title: TechPrep Scheduler | Team Name: a-synchronizers

## Description of our web application:

A website for software engineers or cs students to practice mock technical interviews, a user can sign up and choose between 2 roles, an interviewer or an interviewee. They can choose available times and our program will match another eligible user for a scheduled mock interview, the mock interview will have a shared code editor + compiler and the users will be able to communicate with each other with chatbox, and voice chat and webcam. These features will make the interview experience more realistic and will help people get better at technical rounds in tech interviews.

### Backend focused:

Our web application is Backend focused due to the fact that we need to save mock interview sessions, using a code editor and have the code compiled all in the backend. We also are going to provide communication features such as webcam, voice call, chat, etc so these features will need the use of a socket api and will make our web app more backend focused. We will still try our best to make our web app look nice on the frontend.

### Tech Stack (for now):

- MongoDB (Database)
- Express (Backend)
- React (Frontend)
- Nodejs (Backend)

##### Team members with student numbers:

- Andrew Qian: 1006444224
- Shence Yang: 1006975285
- Muntaqa Mahmood: 1007196927

## Complexity points our project will contain:

- React flow (2)
  - interactive node-based UIs for interview flow visualization
  - Real-time feedback for interviewees
  - Interactive decision trees
- sendgrid (2)
  - email sending service for confirmations/mock interview link
- Monaco Editor (1)
  - code editor
- auth0 (1)
  - authentication for signup using Google
- peerjs (1)
  - video/audio call, webcam
- socket.io (1)
  - chatbox
- compiler-api (1)
  - code compiler
- Bee-Queue (3)
  - Task queue (bonus: challenge factor)

#### (optional) What complexity points will be attempted as bonus for the challenge factor

- Bee-Queue will be attempted as bonus for the challenge factor

#### What you aim to complete for the alpha version, beta version, and final version

- Alpha Version: Setting up Express server for our backend, React Flow for Frontend, Database, Login/Sign up(Register), Authentication, Mock interview scheduling (figure out task queueing with Bee-Queue) and sending emails with sendgrid, get started with code liveshare with PeerJS and code editor with Monaco editor.

- Beta Version: Work and try to complete: Mock interview scheduling with task queueing, Code liveshare + Code editor, Code compiler, chatbox, webcam + voice chat.

- Final Version: Finishing up our features mentioned above, polishing up frontend, deployment.

Video Demo: link https://youtu.be/xm61xDgaD14
