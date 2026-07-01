const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[6-9]\d{9}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "owner",
    },
    hostelName: {
      type: String,
      required: true,
    },
    hostelAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Owners", ownerSchema);
