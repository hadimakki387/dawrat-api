import { getCoursesByUserId } from "@/backend/modules/Courses/courses.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await getCoursesByUserId(req);
}
