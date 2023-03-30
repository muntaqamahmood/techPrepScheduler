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

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});
//exposes the GET /socket.io endpoint
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID:${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("Data Room", data);
    socket.to(data.room).emit("receive_message", data);

    console.log(
      `user with ID:${socket.id} sent message to room : ${data.message}`
    );
  });

  socket.on("disconnect", () => {
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
