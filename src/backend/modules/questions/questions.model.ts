//create a mongoose schema for our question model

import mongoose, { models } from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
    updatedAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  public:{
    type:Boolean,
    default:false
  }
});

const Question = models.Question || mongoose.model("Question", questionSchema);

export default Question;
