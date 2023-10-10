import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  miniDescription: {
    type: String,
  },
  tags: {
    type: [String],
  },
  githubUrl: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  Mentor: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
  Mentee: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
