import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    profilePic: {
      type: String,
      default: "",
    },
    pin: {
      type: Number,
      unique: true,
    },
    coin: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "visitor",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
