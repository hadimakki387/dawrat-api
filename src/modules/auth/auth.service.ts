import { ApiError } from "@/errors";
import { getUserByEmail } from "../user/user.service";
import httpStatus from "http-status";
import { UserInterface } from "../user/user.interfaces";
import { verifyPass } from "../user/user.helperFunctions";
import { loginUserValidate } from "./auth.validate";
import { Token } from "@/token";
import { verifyToken } from "@/token/token.service";
import jwt from "jsonwebtoken";
import { config } from "@/config/config";

export const loginUserWithEmailAndPassword = async (email: string,password: string) => {
  const user = await getUserByEmail(email);
  const validate = loginUserValidate.body.validate({ email, password });


  if (validate.error) {
    return new ApiError(httpStatus.BAD_REQUEST, validate.error.message);
  }

  if (!user || !(await verifyPass(password, user.password))) {
    return new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return user;
};
