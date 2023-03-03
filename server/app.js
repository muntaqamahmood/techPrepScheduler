import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users_router.js";

const app = express();
const port = 5000;

// require('dotenv').config();
dotenv.config();
connectDB();

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", usersRouter);

app.listen(port, (error) => {
  if (error) {
    console.log("Error at app.listen: ", error);
  } else {
    console.log(`HTTP server on http://localhost:${port}`);
  }
});
