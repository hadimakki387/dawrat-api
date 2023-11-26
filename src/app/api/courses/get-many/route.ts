import { returnArrayData } from "@/backend/helper-functions/returnData";
import Course from "@/backend/modules/Courses/courses.model";
import MongoConnection from "@/backend/utils/db";



export async function PATCH(req:Request) {
    MongoConnection()
    const ids:string[] = await req.json()

    const courses = await Course.find({ _id: { $in: ids } });
    const updatedCourses = returnArrayData(courses)
 

    
    return new Response(JSON.stringify(updatedCourses), {
        status: 200,
    });
}