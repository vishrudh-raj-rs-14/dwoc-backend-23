import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  Mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hasBeenApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  feedBack: {
    type: String,
  },
  level: {
    type: Number,
    requireed: true,
  },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
