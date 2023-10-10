import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  githubHandle: {
    type: String,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
  isFilled: {
    type: Boolean,
    default: false,
  },
  college: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  tshirtSize: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
