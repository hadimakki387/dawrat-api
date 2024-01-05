import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnArrayData } from "@/backend/helper-functions/returnData";
import Document from "@/backend/modules/Documents/document.model";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const id = getIdFromUrl(req.url);
    //sort aaccording to upload date
    const docs = await Document.find({university: id}).sort({createdAt: -1})
    return new Response(JSON.stringify(returnArrayData(docs)), {status: 200});
}