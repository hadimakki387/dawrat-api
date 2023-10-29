import User from "./user.model";
import * as bcrypt from "bcryptjs";

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
