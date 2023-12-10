import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import isEmail from "validator/lib/isEmail";
import { isEmailTaken, shuffleArray } from "./user.helperFunctions";
import { UserInterface } from "./user.interfaces";
import User from "./user.model";
import { createUserValidation } from "./user.validation";
import University from "../universities/universities.model";
import MongoConnection from "@/backend/utils/db";
import { generateAuthTokens } from "@/backend/token/token.service";
import { returnData } from "@/backend/helper-functions/returnData";
import Document from "../Documents/document.model";
import Course from "../Courses/courses.model";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";



export const create = async (userBody: UserInterface) => {
  MongoConnection();
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
  MongoConnection();

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
        id: userWithoutPassword._id,
        statusCode: httpStatus.OK,
        university: uni,
      }),
      { status: httpStatus.OK }
    );
  }
  return foundUser;
};

export const getRecentlyViewed = async (req: NextRequest) => {
  const body = await req.json();

  console.log("this is the body");
  console.log(body);

  const docs = body.filter((doc: any) => doc.type === "doc");
  const courses = body.filter((doc: any) => doc.type === "course");

  const queryDocs = await Document.find({
    _id: { $in: docs.map((doc: any) => doc.id) },
  });
  const queryCourses = await Course.find({
    _id: { $in: courses.map((course: any) => course.id) },
  });

  // i want to create a shuffled array of the two arrays
  const shuffledArray = shuffleArray([...queryDocs, ...queryCourses]);

  return new NextResponse(JSON.stringify(shuffledArray), { status: 200 });
};

export const updateUser = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const update = await User.findByIdAndUpdate(id, body, { new: true });

  if (!update) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const { password, ...userWithoutPassword } = update.toObject();

  return new NextResponse(
    JSON.stringify({ ...userWithoutPassword, id: userWithoutPassword._id }),
    { status: 200 }
  );
};

export const updateUniversity = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const update = await User.findByIdAndUpdate(id, body, { new: true });

  if (!update) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const updatedUni = await University.findById(update.university);

  return new NextResponse(JSON.stringify(returnData(updatedUni)), {
    status: 200,
  });
};

export const changePassword = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const { oldPassword, newPassword } = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return new NextResponse(JSON.stringify({ message: "Incorrect Password" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 8);

  const updateUser = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  );

  if (!updateUser) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify({ message: "Password Changed" }), {
    status: 200,
  });
};

export const updateReviewedDocuments = async (req: NextRequest) => {

  MongoConnection()

  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // //i want to check if the document is is already in the user's reviewed documents
  // //if it is, i want to remove it from the array and then added it to the front of the array
  // //if it is not, i want to add it to the front of the array

  const isAlreadyReviewed = user.reviewedDocuments.find(
    (doc: string) => doc === body.document
  );

  if (isAlreadyReviewed) {
    const filteredArray = user.reviewedDocuments.filter(
      (doc: string) => doc !== body.document
    );
    const updatedArray = [body.document, ...filteredArray];
    const updateUser = await User.findByIdAndUpdate(
      id,
      { reviewedDocuments: updatedArray },
      { new: true }
    );
    return new NextResponse(JSON.stringify(body.document), {
      status: 200,
    });
  }

  const updatedArray = [body.document, ...user.reviewedDocuments];

  const updateUser = await User.findByIdAndUpdate(
    id,
    { reviewedDocuments: updatedArray },
    { new: true }
  );

  return new NextResponse(JSON.stringify(body.document), {
    status: 200,
  });
};

export const updateReviewedCourses = async (req: NextRequest) => {
  MongoConnection()

  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // //i want to check if the course is is already in the user's reviewed courses
  // //if it is, i want to remove it from the array and then added it to the front of the array
  // //if it is not, i want to add it to the front of the array

  const isAlreadyReviewed = user.reviewedCourses.find(
    (doc: string) => doc === body.course
  );

  if (isAlreadyReviewed) {
    const filteredArray = user.reviewedCourses.filter(
      (doc: string) => doc !== body.course
    );
    const updatedArray = [body.course, ...filteredArray];
    console.log(updatedArray)
    const updateUser = await User.findByIdAndUpdate(
      id,
      { reviewedCourses: updatedArray },
      { new: true }
    );
    return new NextResponse(JSON.stringify(body.course), {
      status: 200,
    });
  }

  const updatedArray = [body.course, ...user.reviewedCourses];

  const updateUser = await User.findByIdAndUpdate(
    id,
    { reviewedCourses: updatedArray },
    { new: true }
  );

  return new NextResponse(JSON.stringify(body.course), {
    status: 200,
  });
};
