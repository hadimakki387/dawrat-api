import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    return await getDocumentById(req)
}