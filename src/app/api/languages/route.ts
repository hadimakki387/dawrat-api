import { returnArrayData } from "@/backend/helper-functions/returnData";
import { Language } from "@/backend/modules/Documents/document.model";
import MongoConnection from "@/backend/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    MongoConnection()
    const languages = await Language.find({})
    return NextResponse.json(returnArrayData(languages));
}