import isEmail from "validator/lib/isEmail";
import { UserInterface } from "./user.interfaces";
import httpStatus, { BAD_REQUEST } from "http-status";
import User from "./user.model";

import { isEmailTaken } from "./user.helperFunctions";
import * as bcrypt from "bcryptjs";
import MongoConnection from "@/utils/db";
import { generateAuthTokens } from "@/token/token.service";
import { NextApiResponse } from "next";
import { createUserValidation } from "./user.validation";
import { Token } from "@/token";
import { NextResponse } from "next/server";

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

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: tokens.access.token,
    refreshToken: tokens.refresh.token,
    statusCode: httpStatus.CREATED,
  };
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email: email,
  });
  return user;
};
