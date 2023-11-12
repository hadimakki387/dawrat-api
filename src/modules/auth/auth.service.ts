import { getUserByEmail } from "../user/user.service";
import httpStatus from "http-status";
import { UserInterface } from "../user/user.interfaces";
import { verifyPass } from "../user/user.helperFunctions";
import { loginUserValidate } from "./auth.validate";
import { Token } from "@/token";
import { generateToken, verifyToken } from "@/token/token.service";
import jwt from "jsonwebtoken";
import { config } from "@/config/config";
import moment from "moment";
import { NextResponse } from "next/server";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await getUserByEmail(email);
  const validate = loginUserValidate.body.validate({ email, password });

  if (validate.error) {
    return new NextResponse(
      JSON.stringify({ message: validate.error.message }),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: "Incorrect email or password" }),
      { status: httpStatus.UNAUTHORIZED }
    );
  }

  if (user) {
    const isMatch = await verifyPass(password, user.password);
    if (isMatch) {
      const access: string = generateToken(user._id,moment().add(3, "h"),"access");
      return { user: user, token: access };
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email or password" }),
        { status: httpStatus.UNAUTHORIZED }
      );
    }
  }
};
