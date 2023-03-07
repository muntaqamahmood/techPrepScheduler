import express from "express";
const router = express.Router();
import { Interview } from "../models/Interview.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { Router } from "express";


export const interviewsRouter = Router();

// @route   POST api/interviews
// @desc    Create an interview
// @access  Private
interviewsRouter.post("/", async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) res.status(404).json({ message: "User not found" });
  const userIdObj = new mongoose.mongo.ObjectId(userId);
  req.body.creator = userIdObj;
  const {title, description, date} = req.body;
  
  const interview = new Interview({
    creator: userIdObj,
    title,
    description,
    date,
  });

  interview.save();
  user.interviewsCreated.push(interview._id);
  interview.usersJoined.push(userIdObj);
  interview.save();
  user.save();

  res.status(200).json({interview, user});
});

// @route   GET api/interviews/all
// @desc    Get all interviews
// @access  Private
interviewsRouter.get("/all", (req, res) => {
  Interview.find()
    .then((interviews) => res.json(interviews))
    .catch((err) => res.status(400).json("Error: " + err));
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
    const userId = req.user.id;
    const user = await User.findById(userId);
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

    usersJoined.push(userid2);
    user.interviewsJoined.push(interviewid2);
    await interview.save();
    await user.save();
    res.status(200).json({ message: "User has been added to interview" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userId);
    console.log(interview.creator.toString());
    //check if user is the creator of the interview
    if (interview.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unathorized to delete this interview" });
    }
    await interview.remove();
    res.status(200).json({ message: "Interview has been deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

