import { handleFollowCourse } from "@/backend/modules/user/user.service";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    return await handleFollowCourse(req)
}