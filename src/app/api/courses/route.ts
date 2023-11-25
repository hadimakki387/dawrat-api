import Course from "@/modules/Courses/courses.model";
import MongoConnection from "@/utils/db";

export async function GET(req: Request) {
  MongoConnection();

  const course = await Course.find({});

  return new Response(JSON.stringify(course), {
    statusText: "hello",
    status: 200,
  });
}
