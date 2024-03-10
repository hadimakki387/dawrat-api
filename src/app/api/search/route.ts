import { returnArrayData } from "@/backend/helper-functions/returnData";
import Course from "@/backend/modules/Courses/courses.model";
import Document from "@/backend/modules/Documents/document.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

MongoConnection();

export async function GET(req: NextRequest) {
  const param = new URL(req.url);
  const title = param.searchParams.get("title");
  const university = param.searchParams.get("university");
  const course = param.searchParams.get("course");
  const language = param.searchParams.get('language')
  const semester = param.searchParams.get('semester')
  let filters: any = {};

  if (title)
    filters.$or = [
      { title: { $regex: new RegExp(title, "i") } },
      { description: { $regex: new RegExp(title, "i") } },
    ];
  if (university) filters.university = university;
  if (course) filters.course = course;
  if(language) filters.language = language
  if(semester) filters.semester = semester


  let courses;
  if (course) {
    const getCourse = await Course.findById(course);
    courses = [getCourse]
  } else {
    // eslint-disable-next-line no-unused-vars
    const {course:CourseID,...restFilters} = filters
    courses = await Course.find(restFilters);
  }

  
  const documents = await Document.find(filters).limit(15);
  const check = await Document.find({language:'65afeb2aa6c67d837da8d636',$or:filters.$or}).limit(15);



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
