import httpStatus from "http-status";
import { createCourseValidation } from "./courses.validation";
import { NextRequest, NextResponse } from "next/server";
import Course from "./courses.model";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import MongoConnection from "@/backend/utils/db";
import { DocumentInterface } from "../Documents/document.interface";
import { DocumentI } from "@/services/types";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";

MongoConnection();

export const getCourses = async (req:NextRequest) => {
  MongoConnection();
  const params = new URL(req.url as string);
  const title = params.searchParams.get("title");
  const limit = params.searchParams.get("limit");
  let filters: any = {};
  if (title) filters.title = new RegExp(title, "i");

  let course;
  if (limit) {
    course = await Course.find(filters).limit(parseInt(limit));
  } else {
    course = await Course.find(filters);
  }
  return new Response(JSON.stringify(course), {
    statusText: "hello",
    status: 200,
  });
};

export const getCourseById = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url)
  const course = await Course.findById(id);
  return new NextResponse(JSON.stringify(returnData(course)), {
    status: 200,
  });
};

export const getCoursesByUserId = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url)
  const courses = await Course.find({ ownerId: id });
  return new NextResponse(JSON.stringify(returnArrayData(courses)), {
    status: 200,
  });
}

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

  if (!course) {
    return new NextResponse(
      JSON.stringify("Something went wrong, course not created"),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  return new NextResponse(JSON.stringify(returnData(course)), { status: 200 });
};

export const getManyCoursesByIds = async (req: Request) => {
  MongoConnection();
  const ids: string[] = await req.json();

  const courses = await Course.find({ _id: { $in: ids } });
  const updatedCourses = returnArrayData(courses);

  const sortedDocs = ids.map((id: string) =>
    updatedCourses.find((doc: DocumentInterface) => doc._id.toString() === id)
  );

  return new Response(JSON.stringify(sortedDocs), {
    status: 200,
  });
};

