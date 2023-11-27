import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnArrayData } from "@/backend/helper-functions/returnData";
import Course from "@/backend/modules/Courses/courses.model";

export async function GET(req: Request) {
  const id = getIdFromUrl(req.url);
  const courses = await Course.find({ university: id });

  return new Response(JSON.stringify(returnArrayData(courses)), { status: 200 });
}
