const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
