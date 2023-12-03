import { updateUniversity } from "@/backend/modules/user/user.service";
import { NextRequest } from "next/server";

export async function PATCH(req:NextRequest){
    return await updateUniversity(req)
}