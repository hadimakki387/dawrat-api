import { returnArrayData } from "@/helper-functions/returnData";
import Course from "@/modules/Courses/courses.model";
import MongoConnection from "@/utils/db";


export async function PATCH(req:Request) {
    MongoConnection()
    const ids:string[] = await req.json()
    console.log(ids)
    const courses = await Course.find({ _id: { $in: ids } });
    const updatedCourses = returnArrayData(courses)
    console.log(updatedCourses)

    
    return new Response(JSON.stringify(updatedCourses), {
        status: 200,
    });
}