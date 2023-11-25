import { Schema, model, models } from "mongoose";
import validator from "validator";

const universitySchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

const University = models.University || model("University", universitySchema);

export default University;
