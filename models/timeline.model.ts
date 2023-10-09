import mongoose, { model } from "mongoose";

const timelineSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Timeline = mongoose.model("Timeline", timelineSchema);

export default Timeline;
