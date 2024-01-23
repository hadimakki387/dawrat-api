import { returnArrayData } from "@/backend/helper-functions/returnData";
import { CurrentYear } from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";
import { NextResponse } from "next/server";

export async function GET(){
    MongoConnection()
    const years = await CurrentYear.find({}).sort({ year: -1 });
    return NextResponse.json(returnArrayData(years));
}