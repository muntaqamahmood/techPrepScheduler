import express from "express";
const router = express.Router();
import Interview from "../models/Interview.js";
import User from "../models/User.js";
import mongoose, { Mongoose } from "mongoose";
import { Router } from "express";
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const interviewsRouter = Router();

// @route   POST api/interviews
// @desc    Create an interview
// @access  Private
interviewsRouter.post("/", async (req, res) => {
  const userEmail = req.body.userEmail;
  const user = await User.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ message: "User not found" });
  const userIdObj = new mongoose.mongo.ObjectId(user._id);
  req.body.creator = userIdObj;
  const { title, description, date } = req.body;
  const interview = new Interview({
    creatorId: user._id,
    creatorName: user.name,
    title,
    description,
    date,
  });
  user.interviewsPosted.push(interview._id);
  interview.usersJoined.push(userIdObj);
  await interview.save();
  await user.save();

  // send email

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: userEmail,
    from: "techprepcheduler@gmail.com",
    subject: "TechPrep Scheduler: Interview Scheduled",
    text: `You have scheduled an interview with the title ${title} and the description ${description}.`,
    html: `<strong>You have scheduled an interview with the title ${title} and the description ${description}.</strong>`,
  };
  console.log("Sending email...");
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully!");
      // res.status(200).json({ message: "Email sent" });
    })
    .catch((error) => {
      console.error(error);
    });

  return res.status(200).json({ interview, user });
});

// @route   GET api/interviews/all
// @desc    Get all interviews
// @access  Private
interviewsRouter.get("/all", async (req, res) => {
  const interviews = await Interview.find();

  return res.status(200).json(interviews);
});

// @route   GET api/interviews/users/:id
// @desc    Get an array of interviews that a user is involved in
// @access  Private
interviewsRouter.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const interviewsJoinedIds = user.interviewsJoined;
    const interviewsPostedIds = user.interviewsPosted;
    const interviewsJoinedObjs = await Interview.find({
      _id: { $in: interviewsJoinedIds },
    });
    const interviewsPostedObjs = await Interview.find({
      _id: { $in: interviewsPostedIds },
    });
    res.status(200).json({
      interviewsJoined: interviewsJoinedObjs,
      interviewsPosted: interviewsPostedObjs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/interviews/users/:email
// @desc    Get an array of interviews that a user has joined by email
// @access  Private
interviewsRouter.get("/usersEmail/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const interviewsJoinedIds = user.interviewsJoined;
    const interviewsJoinedObjs = await Interview.find({
      _id: { $in: interviewsJoinedIds },
    });
    const interviewsPostedIds = user.interviewsPosted;
    const interviewsPostedObjs = await Interview.find({
      _id: { $in: interviewsPostedIds },
    });
    res.status(200).json({
      interviewsJoined: interviewsJoinedObjs,
      interviewsPosted: interviewsPostedObjs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/interviews/:id
// @desc    get an interview by its id
// @access  Private
interviewsRouter.get("/:id", (req, res) => {
  Interview.findById(req.params.id)
    .then((interview) => res.json(interview))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   PUT api/interviews/:id
// @desc    Add user to an interview
// @access  Private
interviewsRouter.put("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    const userEmail = req.body.userEmail;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userid2 = new mongoose.mongo.ObjectId(userId);
    const interviewid2 = new mongoose.mongo.ObjectId(req.params.id);
    const usersJoined = interview.usersJoined;
    if (usersJoined.some((user) => user.toString() == userId)) {
      return res
        .status(400)
        .json({ message: "Interview already contains user" });
    }
    console.log("hehexd");
    console.log("interview", interview);
    console.log("user", user);
    console.log(usersJoined);
    console.log(user.interviewsJoined);
    usersJoined.push(userid2);
    user.interviewsJoined.push(interviewid2);
    await interview.save();
    await user.save();

    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: userEmail,
      from: "techprepcheduler@gmail.com",
      subject: "TechPrep Scheduler: Added to Interview",
      text: `You have been added to an interview. Kindly check your dashboard for more details.`,
      html: `<strong>You have been added to an interview. Kindly check your dashboard for more details.</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully!");
        // res.status(200).json({ message: "Email sent" });
      })
      .catch((error) => {
        console.error(error);
      });

    return res
      .status(200)
      .json({ message: "User has been added to interview" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   DELETE api/interviews/:id
// @desc    Delete an interview
// @access  Private

interviewsRouter.delete("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check if user is the creator of the interview
    if (interview.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unathorized to delete this interview" });
    }
    await Interview.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Interview has been deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
