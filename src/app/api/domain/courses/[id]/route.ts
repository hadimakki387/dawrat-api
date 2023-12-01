import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { getCoursesByDomainId } from "@/backend/modules/Courses/courses.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req.url);
  return await getCoursesByDomainId(id);
}
