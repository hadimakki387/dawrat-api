import { Language } from "@/backend/modules/Documents/document.model";
import { CurrentYear, Semester } from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";
import { LanguageInterface } from "@/services/types";
import { NextResponse } from "next/server";

export async function GET(){
    //i want to create years from 2000 to current year and i want to use date format like date.now and each year have title and value title will be like 2020-2021 and value will be like 2020 in the date format not normal string
    MongoConnection()
    const languages = await Language.findById("65afeb2aa6c67d837da8d636")
    const year = await CurrentYear.findById("65afe474334819a99369ff62")
    console.log("this is year", year)
    console.log("this is languages", languages)

    return NextResponse.json({message: "Hello World"})
}