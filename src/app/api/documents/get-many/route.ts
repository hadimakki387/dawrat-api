import { getManyDocumentsById } from "@/backend/modules/Documents/document.helperFunction";
import { NextRequest } from "next/server";

export async function PATCH(req:NextRequest){
    return await getManyDocumentsById(req)
}