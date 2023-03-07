import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users_router.js";
import { interviewsRouter } from "./routes/interviews_router.js";
import { Server } from "socket.io";
import http from "http";
const app = express();
const httpServer = http.createServer(app);
import bodyParser from "body-parser";
import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
dotenv.config();
connectDB();

const io = new Server(httpServer);
//exposes the GET /socket.io endpoint
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", usersRouter);
app.use("/api/interviews", interviewsRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Error at app.listen: ", error);
  } else {
    console.log(`HTTP server on http://localhost:${process.env.PORT}`);
  }
});
