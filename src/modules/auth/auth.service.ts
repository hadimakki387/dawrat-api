import { returnData } from "@/helper-functions/returnData";
import { generateToken } from "@/token/token.service";
import httpStatus from "http-status";
import moment from "moment";
import { NextResponse } from "next/server";
import { verifyPass } from "../user/user.helperFunctions";
import { getUserByEmail } from "../user/user.service";
import { loginUserValidate } from "./auth.validate";
import Joi from "joi";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await getUserByEmail(email);
  const validate = loginUserValidate.body.validate({ email, password })

  console.log(`this is validate `)
  console.log(validate)


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
      return new NextResponse(
        JSON.stringify({ user: returnData(user), token: access }),
        
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email or password" }),
        { status: httpStatus.UNAUTHORIZED }
      );
    }
  }
  return new NextResponse(
    JSON.stringify({ message: "somthing went wrong" }),
    { status: httpStatus.BAD_REQUEST }
  );
};
