import Course from "@/backend/modules/Courses/courses.model";
import { createCourse } from "@/backend/modules/Courses/courses.service";
import { createDocument } from "@/backend/modules/Documents/document.service";
import { createDocumentValidation } from "@/backend/modules/Documents/document.validation";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  MongoConnection();

  const course = await Course.find({});

  return new Response(JSON.stringify(course), {
    statusText: "hello",
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  return await createCourse(req);
}
