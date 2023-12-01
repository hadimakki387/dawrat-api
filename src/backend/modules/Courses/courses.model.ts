import { Schema, model, models } from "mongoose";
import validator from "validator";

const courseSchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  domain: {
    type: String,
  },
  university: {
    type: String,
  },
  ownerId: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  updatedAt:{
    type:Date,
    default:Date.now()
  } 
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
