import { getManyCoursesByIds } from "@/backend/modules/Courses/courses.service";

export async function PATCH(req: Request) {
  return await getManyCoursesByIds(req);
}
