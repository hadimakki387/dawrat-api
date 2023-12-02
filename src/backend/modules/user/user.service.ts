
import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import isEmail from "validator/lib/isEmail";
import { isEmailTaken } from "./user.helperFunctions";
import { UserInterface } from "./user.interfaces";
import User from "./user.model";
import { createUserValidation } from "./user.validation";
import University from "../universities/universities.model";
import MongoConnection from "@/backend/utils/db";
import { generateAuthTokens } from "@/backend/token/token.service";
import { returnData } from "@/backend/helper-functions/returnData";

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

export const getUserById = async (id: string) => {
  const foundUser = await User.findById(id);

  if (!foundUser) {
    return new Response(
      JSON.stringify({
        message: "User not found",
        statusCode: httpStatus.NOT_FOUND,
      }),
      { status: httpStatus.NOT_FOUND }
    );
  }

  if (foundUser) {
    const uni = await University.findById(foundUser.university);
    const { password, ...userWithoutPassword } = foundUser.toObject();


    return new Response(
      JSON.stringify({
        ...userWithoutPassword,
        id:userWithoutPassword._id,
        statusCode: httpStatus.OK,
        university: uni,
      }),
      { status: httpStatus.OK }
    );
  }
  return foundUser;
};
