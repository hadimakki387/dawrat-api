import { returnData } from "@/backend/helper-functions/returnData";
import { generateToken } from "@/backend/token/token.service";
import MongoConnection from "@/backend/utils/db";
import dayjs from "dayjs";
import httpStatus from "http-status";
import moment from "moment";
import { NextResponse } from "next/server";
import { verifyPass } from "../user/user.helperFunctions";
import { getUserByEmail } from "../user/user.service";
import { loginUserValidate } from "./auth.validate";
import { redirect } from "next/navigation";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  MongoConnection();
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
      const access: string = generateToken(
        user._id,
        moment().add(3, "h"),
        "access"
      );

      return new NextResponse(
        JSON.stringify({ user: returnData(user), token: access }),
        {
          headers: {
            "Set-Cookie": `serverDawratToken=${access}; path=/; HttpOnly; Secure; SameSite=Strict;expires=${dayjs()
              .add(7, "day")
              .toDate()}`,
          },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email or password" }),
        { status: httpStatus.UNAUTHORIZED }
      );
    }
  }
  return new NextResponse(JSON.stringify({ message: "somthing went wrong" }), {
    status: httpStatus.BAD_REQUEST,
  });
};
