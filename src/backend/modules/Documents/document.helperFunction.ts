import { NextRequest } from "next/server";
import Course from "../Courses/courses.model";
import Document from "./document.model";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";

export const checkDocumentTitle = async (title: string) => {
  const doc = await Document.findOne({ title: title });
  if (doc) {
    return true;
  }

  return false;
};

export const getManyDocumentsById = async (req: NextRequest) => {
  const body = await req.json();
  const documents = await Document.find({ _id: { $in: body } });
  const params = new URL(req.url as string);
  const limit = params.searchParams.get("limit");

  const docsWithCourse = await Promise.all(
    documents.map(async (doc) => {
      const course = await Course.findById(doc.course);
      const newDoc = {
        ...returnData(doc),
        courseTitle: course?.title,
      };
      return newDoc;
    })
  );
    console.log(limit)
  if (limit)
    return new Response(JSON.stringify(docsWithCourse.slice(0, +limit) || []), {
      status: 200,
    });
  return new Response(JSON.stringify(docsWithCourse), {
    status: 200,
  });
};

export const getDocumentById = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const doc = await Document.findById(id);
  if (!doc) {
    return new Response(JSON.stringify({ message: "Document not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(doc), { status: 200 });
};
