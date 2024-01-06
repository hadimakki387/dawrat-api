import Document from "@/backend/modules/Documents/document.model";
import University from "@/backend/modules/universities/universities.model";
import User from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    MongoConnection()
    const universities = await University.find().limit(10)
    const documents = await Document.find().sort({upvotes:-1}).limit(10)
    const usersCount = await User.countDocuments()
    const documentsCount = await Document.countDocuments()
    
    return new Response(JSON.stringify({
        universities,
        documents,
        usersCount,
        documentsCount
    }))
}