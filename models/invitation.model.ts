import mongoose, { model } from "mongoose";

const invitationSchema = new mongoose.Schema({
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Organisation",
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["PENDING", "REJECTED", "ACCEPTED"],
    default: "PENDING",
  },
});

const Invitation = mongoose.model("Invitation", invitationSchema);
export default Invitation;
