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
  currentYearOfStudying: {
    type: String,
  },
  OwnerId: {
    type: String,
    required: true,
  },
  documents:{
    type:Array
  }
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
