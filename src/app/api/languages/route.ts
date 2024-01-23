import { returnArrayData } from "@/backend/helper-functions/returnData";
import { Language } from "@/backend/modules/Documents/document.model";
import { NextResponse } from "next/server";

export async function GET() {
    const languages = await Language.find({})
    return NextResponse.json(returnArrayData(languages));
}