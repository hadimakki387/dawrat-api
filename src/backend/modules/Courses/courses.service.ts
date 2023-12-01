import httpStatus from "http-status";
import { createCourseValidation } from "./courses.validation";
import { NextResponse } from "next/server";
import Course from "./courses.model";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import MongoConnection from "@/backend/utils/db";

MongoConnection()

export const getCourses = async () => {
  const courses = await Course.find();
  return new NextResponse(JSON.stringify(returnArrayData(courses)), {
    status: 200,
  });
};

export const getCourseById = async (id: string) => {
  const course = await Course.findById(id);
  return new NextResponse(JSON.stringify(returnData(course)), {
    status: 200,
  });
};

export const getCoursesByDomainId = async (id: string) => {
  const courses = await Course.find({ domain: id });
  return new NextResponse(JSON.stringify(returnArrayData(courses)), {
    status: 200,
  });
};

export const coursesByUniversityId = async (id: string) => {
  const courses = await Course.find({ university: id });
  return new NextResponse(JSON.stringify(returnArrayData(courses)), {
    status: 200,
  });
};

export const createCourse = async (req: Request) => {
  const data = await req.json();

  const validate = createCourseValidation.body.validate(data);
  if (validate.error) {
    return new NextResponse(JSON.stringify(validate.error.message), {
      status: httpStatus.BAD_REQUEST,
    });
  }

  //check if there is courses with the same title in this domain
  const courses = await Course.find({ domain: data.domain });
  const checkIfExist = courses.find((course) => {
    return course.title === data.title;
  });
  if (checkIfExist) {
    return new NextResponse(
      JSON.stringify("Course already exist in this domain"),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  //create course
  const course = await Course.create(data);
  return new NextResponse(JSON.stringify(returnData(course)), { status: 200 });
};