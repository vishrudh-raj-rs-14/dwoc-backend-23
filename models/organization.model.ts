import mongoose, { model } from "mongoose";

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  orgOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  year: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  githubUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  miniDescription: {
    type: String,
    required: true,
  },
  mentors: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  isAccepted: {
    type: String,
    enum: ["PENDING", "REJECTED", "ACCEPTED"],
    default: "PENDING",
  },
  feedBack: {
    type: String,
    default: "",
  },
  orgType: {
    type: String,
    enum: [
      "EXTERNAL",
      "FOODANDTRAVEL",
      "FUN",
      "UTILITIES",
      "PROGRAMMINGTOOLS",
      "GENERICTOOLS",
      "GAMES",
    ],
    default: "EXTERNAL",
  },
});

const Organisation = mongoose.model("Organisation", organisationSchema);

export default Organisation;
