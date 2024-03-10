import { Schema, model, models } from "mongoose";

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
  },
  universityName:{
    type:String,
    required:true
  },
  docsCount:{
    type:Number,
    default:0
  },
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
