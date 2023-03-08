import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import { Router } from "express";

export const usersRouter = Router();

// @route   POST api/users
// @desc    Create an
// @access  Private
usersRouter.post("/", async (req, res) => {
  try {
    const userData = req.body;
    //check if user already exists
    const existingUser = await User.findOne({ userId: userData.userId });
    if (existingUser) {
      return res.status(304).json({ message: "User already exists" });
    }
    const user = new User({
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
    });
    await user.save();
    return res.status(200).json({ message: "User created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:id
// @desc    Get a user by its id
// @access  Private
usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   GET api/users
// @desc    Get all users
// @access  Private
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
