import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    accountType: {
      type: String,
      required: true,
      trim: true,
      enum: ["consumer", "retailer", "manufacturer"],
    },
    displayPicture: {
      type: Object,
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "notification" },
    ],
    forgetPasswordToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
