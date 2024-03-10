import { updateReviewedCourses } from "@/backend/modules/user/user.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await updateReviewedCourses(req);
}