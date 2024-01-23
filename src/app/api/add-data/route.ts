import { Language } from "@/backend/modules/Documents/document.model";
import { CurrentYear, Semester } from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";
import { LanguageInterface } from "@/services/types";
import { NextResponse } from "next/server";

export async function GET(){
    MongoConnection()
    // create semesters from 1 to 8
    // const semesters = []
    // for(let i=1;i<=8;i++){
    //     semesters.push({
    //         title: `Semester ${i}`,
    //         value: i
    //     })
    // }
    // await Semester.create(semesters)

    return NextResponse.json({message: "Hello World"})
}