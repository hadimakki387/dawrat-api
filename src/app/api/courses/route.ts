import { createCourse, getCourses } from "@/backend/modules/Courses/courses.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getCourses(req);
}

export async function POST(req: NextRequest) {
  return await createCourse(req);
}
