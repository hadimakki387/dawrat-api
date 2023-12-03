import { returnArrayData } from "@/backend/helper-functions/returnData";
import Course from "@/backend/modules/Courses/courses.model";
import Document from "@/backend/modules/Documents/document.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

MongoConnection()

export async function GET(req: NextRequest) {
  const param = new URL(req.url);
  const title = param.searchParams.get("title");

  if (!title) {
    const courses = await Course.find().limit(3);
    const documents = await Document.find().limit(15);
    return new Response(
      JSON.stringify([
        ...returnArrayData(courses),
        ...returnArrayData(documents),
      ]),
      {
        status: 400,
      }
    );
  }

  const titleRegex = new RegExp(title, "i");
  const courses = await Course.find({
    $or: [{ title: { $regex: titleRegex } }, { description: { $regex: titleRegex } }],
  }).limit(3);

  const documents = await Document.find({
    $or: [{ title: { $regex: titleRegex } }, { description: { $regex: titleRegex } }],
  }).limit(15);

  return new Response(
    JSON.stringify([
      ...returnArrayData(courses),
      ...returnArrayData(documents),

    ]),
    {
      status: 200,
    }
  );
}
