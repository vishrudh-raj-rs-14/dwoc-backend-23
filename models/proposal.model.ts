import mongoose, { model } from "mongoose";

const proposalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: Boolean,
  },
  feedBack: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
