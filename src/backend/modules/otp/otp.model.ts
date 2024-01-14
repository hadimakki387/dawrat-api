// we are going to use the mongoose schema to create the schema for our domain model

import mongoose, { models } from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 60 * 15 },
  },
});

const Otp = models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
