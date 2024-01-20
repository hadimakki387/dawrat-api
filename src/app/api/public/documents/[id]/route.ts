import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";
import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import Document from "@/backend/modules/Documents/document.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  MongoConnection()
  const id = getIdFromUrl(req.url);
  const doc = await Document.findById(id);
  if(!doc) return Response.json({message: "Document not found"},{status: 404})
  return new Response(JSON.stringify(returnData(doc)));
}
