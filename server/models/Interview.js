import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  usersJoined: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },

  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Interview", interviewSchema);
