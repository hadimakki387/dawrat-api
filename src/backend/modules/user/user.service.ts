import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import { generateToken } from "@/backend/token/token.service";
import MongoConnection from "@/backend/utils/db";
import * as bcrypt from "bcryptjs";
import dayjs from "dayjs";
import httpStatus from "http-status";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import isEmail from "validator/lib/isEmail";
import Course from "../Courses/courses.model";
import Document from "../Documents/document.model";
import Domain from "../domains/domain.model";
import University from "../universities/universities.model";
import { isEmailTaken, shuffleArray } from "./user.helperFunctions";
import { UserInterface } from "./user.interfaces";
import User from "./user.model";
import { createUserValidation } from "./user.validation";
MongoConnection();

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
    password: await bcrypt.hash(userBody?.password, 8),
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not created" }), {
      status: httpStatus.BAD_REQUEST,
    });
  }

  const access: string = generateToken(
    user._id,
    moment().add(3, "h"),
    "access"
  );

  return new Response(
    JSON.stringify({ user: returnData(user), token: access }),
    {
      status: httpStatus.CREATED,
      headers: {
        "Set-Cookie": `serverDawratToken=${access}; HttpOnly; Path=/; Max-Age=${
          dayjs().add(7, "day").unix() - dayjs().unix()
        }; SameSite=Strict;expires=${dayjs().add(7, "day").toDate()}`,
      },
    }
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
    const domain = await Domain.findById(foundUser.domain);
    

    const {password, university,domain: domainId,...userWithoutPassword} = foundUser.toObject();

    return new Response(
      JSON.stringify({
        ...userWithoutPassword,
        id: userWithoutPassword._id,
        statusCode: httpStatus.OK,
        university: uni ? returnData(uni) : undefined,
        domain: domain ? returnData(domain) : undefined,
      }),
      { status: httpStatus.OK }
    );
  }
  return foundUser;
};

export const getRecentlyViewed = async (req: NextRequest) => {
  const body = await req.json();

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

  return new NextResponse(JSON.stringify(returnArrayData(shuffledArray)), {
    status: 200,
  });
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

  let { password, ...userWithoutPassword } = update.toObject();
  const getUniversity = await University.findById(
    userWithoutPassword.university
  );
  const getDomain = await Domain.findById(userWithoutPassword.domain);
  userWithoutPassword.university = getUniversity
    ? returnData(getUniversity)
    : undefined;
  userWithoutPassword.domain = getDomain ? returnData(getDomain) : undefined;

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
  MongoConnection();

  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

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
  MongoConnection();

  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const isAlreadyReviewed = user.reviewedCourses.find(
    (doc: string) => doc === body.course
  );

  if (isAlreadyReviewed) {
    const filteredArray = user.reviewedCourses.filter(
      (doc: string) => doc !== body.course
    );
    const updatedArray = [body.course, ...filteredArray];
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



export const handleFollowCourse = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const user = await User.findById(id);
  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  const isAlreadyFollowed = user.followedCourses.find(
    (course: string) => course === body.course
  );
  if (!isAlreadyFollowed) {
    const filteredArray = user.followedCourses.filter(
      (course: string) => course !== body.course
    );
    const updatedArray = [body.course, ...filteredArray];
    const updateUser = await User.findByIdAndUpdate(
      id,
      { followedCourses: updatedArray },
      { new: true }
    );
    if (!updateUser) {
      return new NextResponse(
        JSON.stringify({ message: "Somthing Went Wrong" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(updatedArray), { status: 200 });
  }
  const filteredArray = user.followedCourses.filter(
    (course: string) => course !== body.course
  );

  const updateUser = await User.findByIdAndUpdate(
    id,
    { followedCourses: filteredArray },
    { new: true }
  );
  if (!updateUser) {
    return new NextResponse(
      JSON.stringify({ message: "Somthing Went Wrong" }),
      { status: 404 }
    );
  }

  return new NextResponse(JSON.stringify(filteredArray), { status: 200 });
};
