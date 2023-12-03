import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { updateUserUploads } from "../user/user.helperFunctions";
import { checkDocumentTitle } from "./document.helperFunction";
import Document from "./document.model";
import { createDocumentValidation } from "./document.validation";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import Course from "../Courses/courses.model";
import University from "../universities/universities.model";

export const createDocument = async (req: NextRequest) => {
  MongoConnection();
  const userBody = await req.json();
  const verifyData = createDocumentValidation.body.validate(userBody);
  const checkTitle = await checkDocumentTitle(userBody.title);

  if (verifyData.error) {
    return new NextResponse(
      JSON.stringify({ message: verifyData.error.message }),
      { status: 400 }
    );
  }

  if (checkTitle) {
    return new NextResponse(
      JSON.stringify({ message: "Title already Taken" }),
      { status: 400 }
    );
  }

  const course = await Course.findById(userBody.course);
  const university = await University.findById(userBody.university);

  const doc = await Document.create({
    ...userBody,
    courseName: course.title,
    universityName: university.title,
  });

  const updatedUser = await updateUserUploads(userBody.ownerId);

  return new NextResponse(
    JSON.stringify({ doc: doc, updatedUser: updatedUser }),
    { status: 200 }
  );
};

export const getRecommendedDocumentsInDomain = async (req: NextRequest) => {
  MongoConnection();
  //i want to get the top 8 documents that have the highest upvotes at a specific university using the university id
  const id = getIdFromUrl(req.url);
  const documents = await Document.find({ domain: id })
    .sort({ upvotes: -1 })
    .limit(8);

  return new NextResponse(JSON.stringify(documents), { status: 200 });
};
