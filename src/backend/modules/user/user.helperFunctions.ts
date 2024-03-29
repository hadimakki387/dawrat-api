import * as bcrypt from "bcryptjs";
import Course from "../Courses/courses.model";
import Document from "../Documents/document.model";
import User from "./user.model";

export const isEmailTaken = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const verifyPass = (pass: string, hash: string) => {
  const isMatch = bcrypt.compare(pass, String(hash));
  return isMatch;
};

export const updateUserUploads = async (userId: string) => {
  const uploads = await Document.find({ ownerId: userId });
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { uploads: uploads.length },
    { new: true }
  );

  return updateUser;
};

export const updateDocsCountInCourse = async (courseId: string) => {
  const docs = await Document.find({ course: courseId });
  const updateCourse = await Course.findByIdAndUpdate(
    courseId,
    { docsCount: docs.length },
    { new: true }
  );
  return updateCourse;
};

export function shuffleArray(array: unknown[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
