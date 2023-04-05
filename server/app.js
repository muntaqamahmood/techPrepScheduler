import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users_router.js";
import { interviewsRouter } from "./routes/interviews_router.js";
import { compilerRouter } from "./routes/code_compiler.js";
import { emailRouter } from "./routes/send_email.js";
import { Server } from "socket.io";
import http from "http";
const app = express();
const httpServer = http.createServer(app);
import bodyParser from "body-parser";
import cors from "cors";
const corsOptions = {
  origin: "https://techprepscheduler.tech",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const socketIds = [];
app.use(cors(corsOptions)); // Use this after the variable declaration
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use(bodyParser.json());
dotenv.config();
connectDB();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
//exposes the GET /socket.io endpoint
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    socket.join(data);
    console.log(`user with ID:${socket.id} joined room : ${data}`);
    // add new object to socketIds array
    socketIds.push({ [socket.id]: data });
    console.log("socketIds", socketIds);

    // emit socketIds array to client
    socket.emit("socket_ids", socketIds);
  });

  socket.on("send_message", (data) => {
    console.log("Data Room", data);
    socket.to(data.room).emit("receive_message", data);

    console.log(
      `user with ID:${socket.id} sent message to room : ${data.message}`
    );
  });

  socket.on("disconnect", () => {
    socket;
    console.log("User disconnected", socket.id);
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
app.use("/api/compiles", compilerRouter);
app.use("/api/feedback", emailRouter);

httpServer.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Error at app.listen: ", error);
  } else {
    console.log(`HTTP server on ${process.env.PORT}`);
  }
});
