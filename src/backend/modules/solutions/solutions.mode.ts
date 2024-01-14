import { Schema, model, models } from "mongoose";
import validator from "validator";
import { SolutionInterface } from "./solutions.interface";

const solutionSchema = new Schema<SolutionInterface>({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    trim: true,
  },
  document: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
  },
  doc: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  documentName:{
    type:String,
    required:true,
  }
});

const Solution = models.Solution || model("Solution", solutionSchema);

export default Solution;
