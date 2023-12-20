import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import {
  updateDocsCountInCourse,
  updateUserUploads,
} from "../user/user.helperFunctions";
import { checkDocumentTitle } from "./document.helperFunction";
import Document from "./document.model";
import { createDocumentValidation } from "./document.validation";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import Course from "../Courses/courses.model";
import University from "../universities/universities.model";
import { returnArrayData } from "@/backend/helper-functions/returnData";
import httpStatus from "http-status";
import { utapi } from "@/backend/utils/uploadThing";
import User from "../user/user.model";

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

  if (!doc) {
    return new NextResponse(
      JSON.stringify({ message: "Something went Wrong, Doc Not Created" }),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  const updatedUser = await updateUserUploads(userBody.ownerId);
  const updatedCourse = await updateDocsCountInCourse(userBody.course);

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

  return new NextResponse(JSON.stringify(returnArrayData(documents)), { status: 200 });
};

export const getDocumentsByCourseId = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const params = new URLSearchParams(req.url);
  const sort = params.get("sort");
  //set the sort to be sorted according to date or upvotes according to the query params

  if (sort === "date") {
    const documents = await Document.find({ course: id }).sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(returnArrayData(documents)), {
      status: 200,
    });
  } else {
    const documents = await Document.find({ course: id }).sort({ upvotes: -1 });

    return new NextResponse(JSON.stringify(returnArrayData(documents)), {
      status: 200,
    });
  }
};

export const getDocumentsByOwnerId = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const documents = await Document.find({ ownerId: id });

  return new NextResponse(JSON.stringify(returnArrayData(documents)), {
    status: 200,
  });
};

export const DeleteDocument = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);

  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const user = await User.findById(doc.ownerId);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  // i want to remove the document from reviewed documents array in user

  const filteredArray = user.reviewedDocuments.filter(
    (doc: string) => doc !== id
  );

  const updateUser = await User.findByIdAndUpdate(
    user._id,
    { reviewedDocuments: filteredArray },
    { new: true }
  );


  const DeletedDoc = await Document.findByIdAndDelete(id);
  const body = await req.json();
  const deleteFiles = await utapi.deleteFiles(body);

  if (!deleteFiles.success) {
    return new NextResponse(
      JSON.stringify({ message: "Somthing Went Wrong" }),
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }


  return new NextResponse(JSON.stringify({ message: "Document Deleted" }), {
    status: httpStatus.OK,
  });
};

export const updateDocument = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const body = await req.json();
  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const updatedDoc = await Document.findByIdAndUpdate(id, body, { new: true });

  return new NextResponse(JSON.stringify(updatedDoc), { status: 200 });
};
