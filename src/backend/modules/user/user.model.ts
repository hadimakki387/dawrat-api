import { Schema, model, models } from "mongoose";
import validator from "validator";

const userSchema = new Schema<any, any>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
    private: true,
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: "Domain",
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: "University",
  },
  currentYearOfStudying: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  reviewedCourses: {
    type: Array,
    default: [],
  },
  uploads: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  reviewedDocuments: {
    type: Array,
    default: [],
  },
  questionsCount: {
    type: Number,
    default: 0,
  },
  studylist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Studylist", // use the string name of the model
    },
  ],
  helpedStudents: {
    type: Number,
    default: 0,
  },
  likedDocuments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  dislikedDocuments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  followedCourses: {
    type: Array,
    default: [],
  },
  language: {
    type: String,
  },
});

const currentYearSchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  year: { type: Date, required: true },
});

const semesterSchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Semester = models.Semester || model("Semester", semesterSchema);
const CurrentYear = models.CurrentYear || model("CurrentYear", currentYearSchema);
const User = models.User || model("User", userSchema);

export { CurrentYear, Semester };
export default User;
