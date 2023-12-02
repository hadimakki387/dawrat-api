import { getRecommendedDocumentsInDomain } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    return await getRecommendedDocumentsInDomain(req)
}