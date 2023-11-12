import { generateAuthTokens } from "@/token/token.service";
import MongoConnection from "@/utils/db";
import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import isEmail from "validator/lib/isEmail";
import { isEmailTaken } from "./user.helperFunctions";
import { UserInterface } from "./user.interfaces";
import User from "./user.model";
import { createUserValidation } from "./user.validation";

MongoConnection();

export const create = async (userBody: UserInterface) => {
  const emailCheck = isEmail(userBody.email);
  const emailTaken = await isEmailTaken(userBody.email);
  const validate = createUserValidation.body.validate(userBody);

  if (validate.error) {
    return new NextResponse(
      JSON.stringify({ message: validate.error.message }),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  if (!emailCheck) {
    return new NextResponse(JSON.stringify({ message: "Invalid Email" }), {
      status: httpStatus.BAD_REQUEST,
    });
  }

  if (emailTaken) {
    return new NextResponse(
      JSON.stringify({ message: "Email Already Taken" }),
      { status: httpStatus.CONFLICT }
    );
  }

  const user = await User.create({
    ...userBody,
    password: await bcrypt.hash("password1", 8),
  });

  const tokens = await generateAuthTokens({ ...user, id: user.id });

  return new Response(
    JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,
      statusCode: httpStatus.CREATED,
    }),
    { status: httpStatus.CREATED }
  );
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email: email,
  });
  return user;
};
