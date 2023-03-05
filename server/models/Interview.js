const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema({
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

module.exports = mongoose.model("Interview", InterviewSchema);
