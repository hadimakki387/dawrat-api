import { returnArrayData } from "@/backend/helper-functions/returnData";
import { Semester } from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";
import { NextResponse } from "next/server";

export async function GET(){
    MongoConnection()
    const semesters = await Semester.find({}).sort({ year: -1 });
    return NextResponse.json(returnArrayData(semesters));
}