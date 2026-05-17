import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    roomId: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    candidateEmail: {
      type: String,
      required: true,
    },

    status: {
  type: String,

  enum: [
    "scheduled",
    "completed",
    "cancelled",
  ],

  default: "scheduled",
},
  },

  
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Interview",
  interviewSchema
);